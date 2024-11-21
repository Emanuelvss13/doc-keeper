import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { DocumentControllerContract } from './document.contract';
import { DocumentsRepository } from './entities/repository/documents.repository';
import { DocumentsDrizzleRepository } from './infra/drizzle/documents-drizzle.repository';

@Controller()
export class DocumentsController {
  constructor(
    @Inject(DocumentsDrizzleRepository)
    private readonly documentRepository: DocumentsRepository,
  ) {}

  @TsRestHandler(DocumentControllerContract.getDocuments)
  async getDocuments() {
    return tsRestHandler(DocumentControllerContract.getDocuments, async () => {
      const documents = await this.documentRepository.findAll();

      if (!documents) {
        return { status: 404, body: null };
      }

      return { status: 200 as const, body: documents };
    });
  }
}
