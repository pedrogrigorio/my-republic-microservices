// import { SearchAdvertisementsByCityUseCase } from '../../application/use-cases/search-advertisements-by-city';
// import { GetAdvertisementsByOwnerUseCase } from '../../application/use-cases/get-advertisements-by-owner.usecase';
// import { GetAllAdvertisementsUseCase } from '../../application/use-cases/get-all-advertisements.usecase';
// import { GetAdvertisementByIdUseCase } from '../../application/use-cases/get-advertisement-by-id.usecase';
// import { DeleteAdvertisementUseCase } from '../../application/use-cases/delete-advertisement.usecase';
// import { UpdateAdvertisementUseCase } from '../../application/use-cases/update-advertisement.usecase';
// import { CreateAdvertisementUseCase } from '../../application/use-cases/create-advertisement.usecase';
// import { CreateAdvertisementDto } from '../../application/dtos/create-advertisement.dto';
// import { UpdateAdvertisementDto } from '../../application/dtos/update-advertisement.dto';
// import { buildErrorMessage } from '@src/core/utils/build-error-message';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';
// import {
//   BadRequestException,
//   FileTypeValidator,
//   UseInterceptors,
//   ParseFilePipe,
//   UploadedFile,
//   Controller,
//   Delete,
//   Query,
//   Param,
//   Post,
//   Body,
//   Put,
//   Get,
//   Patch,
// } from '@nestjs/common';
// import { PauseAdvertisementUseCase } from '../../application/use-cases/pause-advertisement.usecase';
// import { CurrentUserId } from '@src/core/decorators/current-user-id.decorator';

import { Controller, Get, Inject } from '@nestjs/common';
import { isPublic } from 'src/core/decorators/is-public.decorator';
import { AdvertisementService } from '../advertisement.service';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
    console.log('Chamou getAllAdvertisements');
    return await firstValueFrom(
      this.advetisementService.getAllAdvertisements({}),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  //   @isPublic()
  //   @Get('search-by-city')
  //   async searchAdvertisementsByCity(
  //     @Query('city') cityId: string,
  //     @Query('page') page: string,
  //     @Query('pageSize') pageSize: string,
  //   ) {
  //     const id = parseInt(cityId);
  //     const pageNumber = page ? parseInt(page) : 1;
  //     const pageSizeNumber = pageSize ? parseInt(pageSize) : 12;

  //     return await this.searchAdvertisementsByCityUseCase.execute(
  //       id,
  //       pageNumber,
  //       pageSizeNumber,
  //     );
  //   }

  //   @Get('get-by-owner')
  //   async getAdvertisementByOwner(
  //     @CurrentUserId() userId: number,
  //     @Query('page') page: string,
  //     @Query('pageSize') pageSize: string,
  //   ) {
  //     const pageNumber = page ? parseInt(page) : 1;
  //     const pageSizeNumber = pageSize ? parseInt(pageSize) : 6;

  //     return await this.getAdvertisementsByOwnerUseCase.execute(
  //       userId,
  //       pageNumber,
  //       pageSizeNumber,
  //     );
  //   }

  //   @isPublic()
  //   @Get(':id')
  //   async getAdvertisement(@Param('id') advertisementId: string) {
  //     const id = parseInt(advertisementId);

  //     return await this.getAdvertisementById.execute(id);
  //   }

  //   @Post()
  //   @UseInterceptors(FileInterceptor('file'))
  //   async createAdvertisement(
  //     @CurrentUserId() userId: number,
  //     @UploadedFile(
  //       new ParseFilePipe({
  //         validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
  //         exceptionFactory: () => {
  //           return new BadRequestException(
  //             'File must be an image of type jpg, jpeg, or png',
  //           );
  //         },
  //       }),
  //     )
  //     file: Express.Multer.File,
  //     @Body('createAdvertisementDto') createAdvertisementDtoString: string,
  //   ) {
  //     if (!createAdvertisementDtoString) {
  //       throw new BadRequestException('Advertisement data is required');
  //     }

  //     let createAdvertisementDto: CreateAdvertisementDto;

  //     try {
  //       const parsedData = JSON.parse(createAdvertisementDtoString);
  //       parsedData.ownerId = userId;

  //       createAdvertisementDto = plainToInstance(
  //         CreateAdvertisementDto,
  //         parsedData,
  //       );
  //     } catch (error) {
  //       if (error instanceof SyntaxError) {
  //         throw new BadRequestException('Invalid JSON format');
  //       } else {
  //         throw error;
  //       }
  //     }

  //     const errors = await validate(createAdvertisementDto);

  //     if (errors.length > 0) {
  //       throw new BadRequestException(buildErrorMessage(errors));
  //     }

  //     await this.createAdvertisementUseCase.execute(file, createAdvertisementDto);
  //   }

  //   @Put(':id')
  //   @UseInterceptors(FileInterceptor('file'))
  //   async updateAdvertisement(
  //     @CurrentUserId() userId: number,
  //     @Param('id') advertisementId: string,
  //     @Body('updateAdvertisementDto') updateAdvertisementDtoString: string,
  //     @UploadedFile(
  //       new ParseFilePipe({
  //         validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
  //         fileIsRequired: false,
  //         exceptionFactory: () => {
  //           return new BadRequestException(
  //             'File must be an image of type jpg, jpeg, or png',
  //           );
  //         },
  //       }),
  //     )
  //     file: Express.Multer.File,
  //   ) {
  //     const id = parseInt(advertisementId);
  //     if (!updateAdvertisementDtoString) {
  //       throw new BadRequestException('Advertisement data is required');
  //     }

  //     let updateAdvertisementDto: UpdateAdvertisementDto;

  //     try {
  //       const parsedData = JSON.parse(updateAdvertisementDtoString);
  //       parsedData.ownerId = userId;

  //       updateAdvertisementDto = plainToInstance(
  //         UpdateAdvertisementDto,
  //         parsedData,
  //       );
  //     } catch (error) {
  //       if (error instanceof SyntaxError) {
  //         throw new BadRequestException('Invalid JSON format');
  //       } else {
  //         throw error;
  //       }
  //     }

  //     const errors = await validate(updateAdvertisementDto);

  //     if (errors.length > 0) {
  //       throw new BadRequestException(buildErrorMessage(errors));
  //     }

  //     await this.updateAdvertisementUseCase.execute(
  //       updateAdvertisementDto,
  //       id,
  //       file,
  //     );
  //   }

  //   @Patch('pause/:id')
  //   async pauseAdvertisement(@Param('id') advertisementId: string) {
  //     const id = parseInt(advertisementId);

  //     await this.pauseAdvertisementUseCase.execute(id);
  //   }

  //   @Delete(':id')
  //   async deleteAdvertisement(@Param('id') advertisementId: string) {
  //     const id = parseInt(advertisementId);

  //     await this.deleteAdvertisementUseCase.execute(id);
  //   }
}
