import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { MinioProvider } from '../providers/storage/minio/minio.provider';
import { DocumentsController } from './documents.controller';
import { DocumentsDrizzleRepository } from './infra/drizzle/documents-drizzle.repository';
import { CreateDocumentUseCase } from './use-cases/create-document.use-case';
import { DeleteDocumentUseCase } from './use-cases/delete-document.use-case';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.use-case';
import { FindByIdUseCase } from './use-cases/find-by-id.use-case';

@Module({
  providers: [
    drizzleProvider,
    DocumentsDrizzleRepository,
    {
      provide: 'FindAllDocumentsUseCase',
      useClass: FindAllDocumentsUseCase,
    },
    {
      provide: 'FindByIdUseCase',
      useClass: FindByIdUseCase,
    },
    {
      provide: 'CreateDocumentUseCase',
      useClass: CreateDocumentUseCase,
    },
    {
      provide: 'DeleteDocumentUseCase',
      useClass: DeleteDocumentUseCase,
    },
    {
      provide: 'MinioProvider',
      useFactory: (configService: ConfigService) => {
        return new MinioProvider(
          configService.get<string>('MINIO_ENDPOINT'),
          parseInt(configService.get<string>('MINIO_PORT')),
          configService.get<string>('MINIO_ACCESS_KEY'),
          configService.get<string>('MINIO_SECRET_KEY'),
          'doc-keeper',
        );
      },
      inject: [ConfigService],
    },
  ],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
