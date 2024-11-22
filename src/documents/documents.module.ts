import { Module } from '@nestjs/common';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { DocumentsController } from './documents.controller';
import { DocumentsDrizzleRepository } from './infra/drizzle/documents-drizzle.repository';
import { CreateDocumentUseCase } from './use-cases/create-document.use-case';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.find-all';
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
  ],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
