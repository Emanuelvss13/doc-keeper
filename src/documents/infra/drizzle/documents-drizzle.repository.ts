import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../../drizzle/drizzle.provider';
import * as schema from '../../../drizzle/schema';
import { ICreateDocumentDTO } from '../../dto/create-document.dto';
import { Document } from '../../entities/document.entity';
import { DocumentsRepository } from '../../entities/repository/documents.repository';
import { DocumentFactory } from '../../factory/document.factory';

@Injectable()
export class DocumentsDrizzleRepository implements DocumentsRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async findById(id: string): Promise<Document | null> {
    const document = await this.drizzle.query.documents.findFirst({
      where: (documents, { eq }) => eq(documents.id, id),
      with: { documentType: true },
    });

    return document ? DocumentFactory.create(document) : null;
  }

  async createDocument({
    emitter,
    documentTypeId,
    title,
    origin,
    totalTaxes,
    netValue,
  }: ICreateDocumentDTO): Promise<Document> {
    const [createdDocument] = await this.drizzle
      .insert(schema.documents)
      .values({
        code: '',
        title,
        emitter,
        netValue,
        origin,
        totalTaxes,
        type: documentTypeId,
      })
      .returning({ id: schema.documents.id });

    const document = await this.drizzle.query.documents.findFirst({
      where: (documents, { eq }) => eq(documents.id, createdDocument.id),
      with: { documentType: true },
    });

    return DocumentFactory.create(document);
  }

  async findAll(): Promise<Document[]> {
    const documents = await this.drizzle.query.documents.findMany({
      with: { documentType: true },
    });

    return documents.map(DocumentFactory.create);
  }
}
