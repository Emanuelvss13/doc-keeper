import { InternalServerErrorException } from '@nestjs/common';
import { Client } from 'minio';
import { IStorage } from '../storage.model';

export class MinioProvider implements IStorage {
  private readonly client: Client;
  private readonly bucketName: string;

  constructor(
    endPoint: string,
    port: number,
    accessKey: string,
    secretKey: string,
    bucketName: string,
  ) {
    this.client = new Client({
      endPoint,
      port,
      useSSL: false,
      accessKey,
      secretKey,
    });

    this.bucketName = bucketName;
  }

  async upload(filename: string, filepath: string): Promise<void> {
    try {
      await this.client.fPutObject(this.bucketName, filename, filepath, {});
    } catch (error) {
      throw new InternalServerErrorException(
        'Error ao fazer upload do arquivo: ',
        error,
      );
    }
  }

  async delete(filepath: string): Promise<void> {}
}
