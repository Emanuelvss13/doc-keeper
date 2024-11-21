import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { DocumentControllerContract } from './document.contract';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.find-all';

@Controller()
export class DocumentsController {
  constructor(
    @Inject('FindAllDocumentsUseCase')
    private readonly findAllDocumentsUseCase: FindAllDocumentsUseCase,
  ) {}

  @TsRestHandler(DocumentControllerContract.getDocuments)
  async getDocuments() {
    return tsRestHandler(DocumentControllerContract.getDocuments, async () => {
      const documents = await this.findAllDocumentsUseCase.execute();

      if (!documents) {
        return { status: 404, body: null };
      }

      return { status: 200 as const, body: documents };
    });
  }
}
