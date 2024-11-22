import { Inject, Injectable } from '@nestjs/common';
import { ICreateDocumentDTO } from '../dto/create-document.dto';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
  ) {}

  async execute(data: ICreateDocumentDTO) {
    return this.documentRepository.createDocument(data);
  }
}
