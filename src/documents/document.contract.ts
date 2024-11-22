import { HttpStatus } from '@nestjs/common';
import { initContract } from '@ts-rest/core';
import { ICreateDocumentDTO } from './dto/create-document.dto';
import { IFindAllDocumentsFilter } from './dto/find-all-documents.filter';
import { Document } from './entities/document.entity';

const c = initContract();

export const DocumentControllerContract = c.router({
  getDocuments: {
    method: 'GET',
    path: `/documents`,
    query: c.type<IFindAllDocumentsFilter>(),
    responses: {
      200: c.type<Document[]>(),
    },
    summary: 'Get a all documents',
  },
  getDocumentById: {
    method: 'GET',
    path: `/documents/:id`,
    responses: {
      200: c.type<Document>(),
      404: c.type<{ code: HttpStatus; error: string }>(),
    },
    summary: 'Get a document by id',
  },
  createDocument: {
    method: 'POST',
    path: '/documents',
    contentType: 'multipart/form-data',
    body: c.type<{
      file: Blob;
      data: ICreateDocumentDTO;
    }>(),
    responses: {
      200: c.type<Document>(),
    },
    summary: 'Create a new document',
  },
});
