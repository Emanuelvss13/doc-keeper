import { InternalServerErrorException } from '@nestjs/common';
import { Client } from 'minio';
import { IStorage } from '../storage.model';

export class MinioProvider implements IStorage {
  private readonly client: Client;
  private readonly bucketName: string;
  private ONE_DAY = 60 * 60 * 24;

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

  async upload(filename: string): Promise<void> {
    try {
      await this.client.fPutObject(this.bucketName, filename, '');
    } catch (error) {
      throw new InternalServerErrorException(
        'Error ao fazer upload do arquivo: ',
        error,
      );
    }
  }

  async get(filename: string): Promise<string> {
    const url = await this.client.presignedUrl(
      'GET',
      this.bucketName,
      filename,
      this.ONE_DAY,
    );

    return url;
  }

  async delete(filename: string): Promise<void> {
    try {
      await this.client.removeObject(this.bucketName, filename);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error ao apagar arquivo: ',
        error,
      );
    }
  }
}
