import { Module } from '@nestjs/common';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { DocumentsController } from './documents.controller';
import { DocumentsDrizzleRepository } from './infra/drizzle/documents-drizzle.repository';

@Module({
  providers: [drizzleProvider, DocumentsDrizzleRepository],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
