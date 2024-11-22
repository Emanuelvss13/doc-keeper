import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { DocumentControllerContract } from './document.contract';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.find-all';
import { FindByIdUseCase } from './use-cases/find-by-id.use-case';

@Controller()
export class DocumentsController {
  constructor(
    @Inject('FindAllDocumentsUseCase')
    private readonly findAllDocumentsUseCase: FindAllDocumentsUseCase,
    @Inject('FindByIdUseCase')
    private readonly findByIdUseCase: FindByIdUseCase,
  ) {}

  @TsRestHandler(DocumentControllerContract.getDocuments)
  async getDocuments() {
    return tsRestHandler(DocumentControllerContract.getDocuments, async () => {
      const documents = await this.findAllDocumentsUseCase.execute();

      if (!documents) {
        return {
          status: 404,
          body: null,
        };
      }

      return { status: 200 as const, body: documents };
    });
  }

  @TsRestHandler(DocumentControllerContract.getDocumentById)
  async getDocumentById() {
    return tsRestHandler(
      DocumentControllerContract.getDocumentById,
      async ({ params }) => {
        const document = await this.findByIdUseCase.execute(params.id);

        console.log(document);

        if (!document) {
          return {
            status: 404,
            body: {
              code: HttpStatus.NOT_FOUND,
              error: 'document not found',
            },
          };
        }

        return { status: 200 as const, body: document };
      },
    );
  }
}
