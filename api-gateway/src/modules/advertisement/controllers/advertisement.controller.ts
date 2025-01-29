import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  BadRequestException,
  FileTypeValidator,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  Controller,
  Delete,
  Query,
  Param,
  Post,
  Body,
  Put,
  Get,
  Patch,
} from '@nestjs/common';

import { Inject } from '@nestjs/common';
import { isPublic } from 'src/core/decorators/is-public.decorator';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AdvertisementService } from '../services/advertisement.service';
import { CurrentUserId } from 'src/core/decorators/current-user-id.decorator';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../dtos/update-advertisement.dto';
import { buildErrorMessage } from 'src/core/utils/build-error-message';

@Controller('advertisements')
export class AdvertisementController {
  private advetisementService: AdvertisementService;

  constructor(
    @Inject('ADVERTISEMENT_SERVICE') private userClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.advetisementService = this.userClient.getService<AdvertisementService>(
      'AdvertisementService',
    );
  }

  @isPublic()
  @Get()
  async getAllAdvertisements() {
    const { advertisements } = await firstValueFrom(
      this.advetisementService.getAllAdvertisements({}),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return advertisements;
  }

  @isPublic()
  @Get('search-by-city')
  async searchAdvertisementsByCity(
    @Query('city') cityId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const id = parseInt(cityId);
    const pageNumber = page ? parseInt(page) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize) : 12;

    return await firstValueFrom(
      this.advetisementService.searchAdvertisementsByCity({
        cityId: id,
        pageNumber,
        pageSizeNumber,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Get('get-by-owner')
  async getAdvertisementByOwner(
    @CurrentUserId() userId: number,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize) : 6;

    return await firstValueFrom(
      this.advetisementService.getAdvertisementByOwner({
        ownerId: userId,
        pageNumber,
        pageSizeNumber,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @isPublic()
  @Get(':id')
  async getAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    const { advertisement } = await firstValueFrom(
      this.advetisementService.getAdvertisementById({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return advertisement;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createAdvertisement(
    @CurrentUserId() userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
        exceptionFactory: () => {
          return new BadRequestException(
            'File must be an image of type jpg, jpeg, or png',
          );
        },
      }),
    )
    file: Express.Multer.File,
    @Body('createAdvertisementDto') createAdvertisementDtoString: string,
  ) {
    if (!createAdvertisementDtoString) {
      throw new BadRequestException('Advertisement data is required');
    }

    let createAdvertisementDto: CreateAdvertisementDto;

    try {
      const parsedData = JSON.parse(createAdvertisementDtoString);
      parsedData.ownerId = userId;

      createAdvertisementDto = plainToInstance(
        CreateAdvertisementDto,
        parsedData,
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException('Invalid JSON format');
      } else {
        throw error;
      }
    }

    const errors = await validate(createAdvertisementDto);

    if (errors.length > 0) {
      throw new BadRequestException(buildErrorMessage(errors));
    }

    const fileBase64 = file.buffer.toString('base64');

    return await firstValueFrom(
      this.advetisementService.createAdvertisement({
        file: {
          buffer: fileBase64,
          mimetype: file.mimetype,
          name: file.originalname,
        },
        createAdvertisementDto,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateAdvertisement(
    @CurrentUserId() userId: number,
    @Param('id') advertisementId: string,
    @Body('updateAdvertisementDto') updateAdvertisementDtoString: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
        fileIsRequired: false,
        exceptionFactory: () => {
          return new BadRequestException(
            'File must be an image of type jpg, jpeg, or png',
          );
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    const id = parseInt(advertisementId);
    if (!updateAdvertisementDtoString) {
      throw new BadRequestException('Advertisement data is required');
    }

    let updateAdvertisementDto: UpdateAdvertisementDto;

    try {
      const parsedData = JSON.parse(updateAdvertisementDtoString);
      parsedData.ownerId = userId;

      updateAdvertisementDto = plainToInstance(
        UpdateAdvertisementDto,
        parsedData,
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException('Invalid JSON format');
      } else {
        throw error;
      }
    }

    const errors = await validate(updateAdvertisementDto);

    if (errors.length > 0) {
      throw new BadRequestException(buildErrorMessage(errors));
    }

    const fileBase64 = file.buffer.toString('base64');

    return await firstValueFrom(
      this.advetisementService.updateAdvertisement({
        file: {
          buffer: fileBase64,
          mimetype: file.mimetype,
          name: file.originalname,
        },
        updateAdvertisementDto,
        id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch('pause/:id')
  async pauseAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    return await firstValueFrom(
      this.advetisementService.pauseAdvertisement({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Delete(':id')
  async deleteAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    return await firstValueFrom(
      this.advetisementService.deleteAdvertisement({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }
}
