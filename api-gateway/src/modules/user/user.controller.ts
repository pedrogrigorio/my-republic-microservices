import {
  Controller,
  Delete,
  Param,
  Get,
  Inject,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { UpdateNameDto } from './dtos/update-name.dto';
import { UpdateEmailDto } from './dtos/update-email.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { firstValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  private userService: UserService;

  constructor(@Inject('USER_SERVICE') private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Post()
  async signUp(@Body() signUpDto: SignUpDto) {
    await firstValueFrom(this.userService.signUp(signUpDto));
  }

  @Get()
  async getAllUsers() {
    const { users } = await firstValueFrom(
      this.userService.getAllUsers({}),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return users;
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    const id = parseInt(userId);
    const { user } = await firstValueFrom(
      this.userService.getUserById({ id }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return user;
  }

  @Patch(':id/update-name')
  async updateName(
    @Body() updateNameDto: UpdateNameDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);
    await firstValueFrom(
      this.userService.updateName({
        body: updateNameDto,
        id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch(':id/update-email')
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await firstValueFrom(
      this.userService.updateEmail({
        body: updateEmailDto,
        id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch(':id/update-password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);
    await firstValueFrom(
      this.userService.updatePassword({
        body: updatePasswordDto,
        id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Patch(':id/update-photo')
  @UseInterceptors(FileInterceptor('file'))
  async updatePhoto(
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
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    const fileBase64 = file.buffer.toString('base64');

    await firstValueFrom(
      this.userService.updatePhoto({
        file: {
          buffer: fileBase64,
          mimetype: file.mimetype,
          name: file.originalname,
        },
        id,
      }),
    ).catch((e) => {
      throw new RpcException(e);
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const id = parseInt(userId);
    await firstValueFrom(this.userService.deleteUser({ id })).catch((e) => {
      throw new RpcException(e);
    });
  }
}
