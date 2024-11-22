import { Document } from '../entities/document.entity';
import { DocumentOrigin } from '../enums/document-origin.enum';
import { DocumentTypeFactory } from './document-type.factory';

export class DocumentFactory {
  static create(document: {
    id: string;
    title: string;
    emitter: string;
    totalTaxes: string;
    netValue: string;
    documentType: { id: number; name: string };
    origin: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new Document(
      document.id,
      document.title,
      document.emitter,
      Number(document.totalTaxes),
      Number(document.netValue),
      DocumentTypeFactory.create(
        document.documentType.id,
        document.documentType.name,
      ),
      DocumentOrigin[document.origin as keyof typeof DocumentOrigin],
      document.createdAt,
      document.updatedAt,
    );
  }
}
