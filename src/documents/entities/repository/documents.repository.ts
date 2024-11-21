import { Document } from '../document.entity';

export interface DocumentsRepository {
  findAll(): Promise<Document[]>;
}
