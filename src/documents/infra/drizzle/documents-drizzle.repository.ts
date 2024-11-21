import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../../drizzle/drizzle.provider';
import * as schema from '../../../drizzle/schema';
import { Document } from '../../entities/document.entity';
import { DocumentsRepository } from '../../entities/repository/documents.repository';
import { DocumentFactory } from '../../factory/document.factory';

export class DocumentsDrizzleRepository implements DocumentsRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<Document[]> {
    const documents = await this.drizzle.query.documents.findMany({
      with: { documentType: true },
    });

    return documents.map(DocumentFactory.create);
  }
}
