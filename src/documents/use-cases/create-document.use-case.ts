import { Inject, Injectable } from '@nestjs/common';
import { IStorage } from '../../providers/storage/storage.model';
import { ICreateDocumentDTO } from '../dto/create-document.dto';
import { DocumentsRepository } from '../entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from '../infra/drizzle/documents-drizzle.repository';

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
    @Inject('MinioProvider')
    private readonly storage: IStorage,
  ) {}

  async execute(data: ICreateDocumentDTO, file: Express.Multer.File) {
    await this.storage.upload(file.filename, file.path);

    return this.documentRepository.createDocument(
      data,
      `doc-keeper/${file.filename}`,
    );
  }
}
