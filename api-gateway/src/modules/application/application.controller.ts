import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { ApplicationService } from './application.service';
import { firstValueFrom } from 'rxjs';
import { CurrentUserId } from 'src/core/decorators/current-user-id.decorator';
import {
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

@Controller('applications')
export class ApplicationController {
  private applicationService: ApplicationService;

  constructor(
    @Inject('APPLICATION_SERVICE') private applicationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.applicationService =
      this.applicationClient.getService<ApplicationService>(
        'ApplicationService',
      );
  }

  @Get()
  async getAllApplications() {
    const { applications } = await firstValueFrom(
      this.applicationService.getAllApplications({}),
    ).catch((e) => {
      throw new RpcException(e);
    });

    const formattedApplications = applications.map((app: any) => ({
      ...app,
      createdAt: new Date(app.createdAt), // Convertendo para Date
    }));

    return { applications: formattedApplications };
  }

  @Get('get-by-user')
  async getApplicationsByUser(@CurrentUserId() userId: number) {
    const response = await firstValueFrom(
      this.applicationService.getApplicationsByUser({ userId }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return response;
  }

  @Get('get-by-ad/:id')
  async getApplicationsByAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    const response = await firstValueFrom(
      this.applicationService.getApplicationsByAdvertisement({
        advertisementId: id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return response;
  }

  @Post()
  async apply(
    @CurrentUserId() userId: number,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    await firstValueFrom(
      this.applicationService.apply({
        userId,
        body: createApplicationDto,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch(':id/refuse')
  async refuseApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    await firstValueFrom(
      this.applicationService.refuseApplication({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch(':id/accept')
  async acceptApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    await firstValueFrom(
      this.applicationService.acceptApplication({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Delete(':id')
  async deleteApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    await firstValueFrom(
      this.applicationService.deleteApplication({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }
}
