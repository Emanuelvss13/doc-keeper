import { Inject, Injectable } from '@nestjs/common';
import { Document } from '../entities/document.entity';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
  ) {}

  async execute(id: string): Promise<Document> {
    const document = await this.documentRepository.findById(id);

    return document ? document : null;
  }
}
