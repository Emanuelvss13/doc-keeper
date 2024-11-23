import { BadRequestException, Inject } from '@nestjs/common';
import { IStorage } from '../../providers/storage/storage.model';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

export class DeleteDocumentUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
    @Inject('MinioProvider')
    private readonly storage: IStorage,
  ) {}

  async execute(id: string): Promise<boolean> {
    const document = await this.documentRepository.findById(id);

    if (!document) {
      throw new BadRequestException('Document not found');
    }

    await this.documentRepository.deleteById(id);
    await this.storage.delete(document.getFilenameInStorage());

    return true;
  }
}
