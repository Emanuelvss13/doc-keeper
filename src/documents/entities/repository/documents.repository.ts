import { ICreateDocumentDTO } from '../../dto/create-document.dto';
import { IFindAllDocumentsFilter } from '../../dto/find-all-documents.filter';
import { Document } from '../document.entity';

export interface DocumentsRepository {
  createDocument(
    createDocumentDTO: ICreateDocumentDTO,
    storagePath,
  ): Promise<Document>;
  findById(id: string): Promise<Document>;
  findAll(filter?: IFindAllDocumentsFilter): Promise<Document[]>;
  deleteById(id: string): Promise<void>;
}
