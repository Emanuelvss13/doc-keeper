import { Module } from '@nestjs/common';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { DocumentsController } from './documents.controller';
import { DocumentsDrizzleRepository } from './infra/drizzle/documents-drizzle.repository';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.find-all';

@Module({
  providers: [
    drizzleProvider,
    DocumentsDrizzleRepository,
    {
      provide: 'FindAllDocumentsUseCase',
      useClass: FindAllDocumentsUseCase,
    },
  ],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
