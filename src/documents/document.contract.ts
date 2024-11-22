import { HttpStatus } from '@nestjs/common';
import { initContract } from '@ts-rest/core';
import { Document } from './entities/document.entity';

const c = initContract();

export const DocumentControllerContract = c.router({
  getDocuments: {
    method: 'GET',
    path: `/documents`,
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
});
