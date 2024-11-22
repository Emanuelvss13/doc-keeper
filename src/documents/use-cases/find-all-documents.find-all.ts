import { Inject, Injectable } from '@nestjs/common';
import { IFindAllDocumentsFilter } from '../dto/find-all-documents.filter';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class FindAllDocumentsUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
  ) {}

  async execute(filter?: IFindAllDocumentsFilter) {
    return this.documentRepository.findAll(filter);
  }
}
