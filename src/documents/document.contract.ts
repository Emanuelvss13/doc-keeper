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
});
