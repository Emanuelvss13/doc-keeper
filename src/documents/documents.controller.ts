import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TsRest, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DocumentControllerContract } from './document.contract';
import { ICreateDocumentDTO } from './dto/create-document.dto';
import { CreateDocumentUseCase } from './use-cases/create-document.use-case';
import { FindAllDocumentsUseCase } from './use-cases/find-all-documents.find-all';
import { FindByIdUseCase } from './use-cases/find-by-id.use-case';

@Controller()
export class DocumentsController {
  constructor(
    @Inject('FindAllDocumentsUseCase')
    private readonly findAllDocumentsUseCase: FindAllDocumentsUseCase,
    @Inject('FindByIdUseCase')
    private readonly findByIdUseCase: FindByIdUseCase,
    @Inject('CreateDocumentUseCase')
    private readonly createDocumentUseCase: CreateDocumentUseCase,
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

  @TsRest(DocumentControllerContract.createDocument)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(pdf|docx|csv)$/)) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: ICreateDocumentDTO,
  ) {
    console.log(file);

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    await this.createDocumentUseCase.execute(params);

    return {
      status: 200 as const,
    };
  }
}
