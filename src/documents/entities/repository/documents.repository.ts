import { ICreateDocumentDTO } from '../../dto/create-document.dto';
import { Document } from '../document.entity';

export interface DocumentsRepository {
  createDocument(createDocumentDTO: ICreateDocumentDTO): Promise<Document>;
  findAll(): Promise<Document[]>;
}
