import { Inject, Injectable } from '@nestjs/common';
import { and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../../drizzle/drizzle.provider';
import * as schema from '../../../drizzle/schema';
import { ICreateDocumentDTO } from '../../dto/create-document.dto';
import { IFindAllDocumentsFilter } from '../../dto/find-all-documents.filter';
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

  async createDocument(
    {
      emitter,
      documentTypeId,
      title,
      origin,
      totalTaxes,
      netValue,
    }: ICreateDocumentDTO,
    storagePath: string,
  ): Promise<Document> {
    const [createdDocument] = await this.drizzle
      .insert(schema.documents)
      .values({
        title,
        emitter,
        netValue,
        origin,
        totalTaxes,
        type: documentTypeId,
        storagePath,
      })
      .returning({ id: schema.documents.id });

    const document = await this.drizzle.query.documents.findFirst({
      where: (documents, { eq }) => eq(documents.id, createdDocument.id),
      with: { documentType: true },
    });

    return DocumentFactory.create(document);
  }

  async findAll(filter: IFindAllDocumentsFilter): Promise<Document[]> {
    const documents = await this.drizzle.query.documents.findMany({
      where({ emitter, netValue, totalTaxes, type }, operators) {
        const conditions = [];

        if (filter.emitter) {
          conditions.push(operators.eq(emitter, filter.emitter));
        }

        if (filter.type) {
          conditions.push(operators.eq(type, filter.type));
        }

        if (filter.totalTax) {
          conditions.push(operators.eq(totalTaxes, filter.totalTax.toString()));
        }

        if (filter.netValue) {
          conditions.push(operators.eq(netValue, filter.netValue.toString()));
        }

        return conditions.length > 0 ? and(...conditions) : undefined;
      },
      with: { documentType: true },
    });

    return documents.map(DocumentFactory.create);
  }
}
