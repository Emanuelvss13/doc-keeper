import { Inject, Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class FindAllDocumentsUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
  ) {}

  async execute() {
    return this.documentRepository.findAll();
  }
}
