import { Inject, Injectable } from '@nestjs/common';
import { IStorage } from '../../providers/storage/storage.model';
import { Document } from '../entities/document.entity';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
    @Inject('MinioProvider')
    private readonly storage: IStorage,
  ) {}

  async execute(id: string): Promise<Document> {
    const document = await this.documentRepository.findById(id);

    const presignedUrl = await this.storage.getSignedUrl(
      document.getFilenameInStorage(),
    );

    document.setUrl(presignedUrl);

    return document ? document : null;
  }
}
