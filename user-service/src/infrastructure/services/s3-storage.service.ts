import { StorageService } from 'src/application/interfaces/storage.service.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { FileDto } from 'src/application/dtos/file.dto';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService implements StorageService {
  private readonly bucketName = this.configService.getOrThrow('AWS_S3_BUCKET');
  private readonly region = this.configService.getOrThrow('AWS_S3_REGION');

  private readonly s3Client = new S3Client({
    region: this.region,
  });

  constructor(private configService: ConfigService) {}

  async upload(file: FileDto): Promise<string> {
    const filename = Date.now() + '-' + file.name;
    const fileBuffer = Buffer.from(file.buffer, 'base64');

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
        Body: fileBuffer,
        ContentType: file.mimetype,
      }),
    );

    const objectUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${filename}`;

    return objectUrl;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const filename = fileUrl.split('/').pop();

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
      }),
    );
  }
}
