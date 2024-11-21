import { DocumentType } from '../entities/document-type.entity';

export class DocumentTypeFactory {
  static create(id: number, name: string) {
    return new DocumentType(id, name);
  }
}
