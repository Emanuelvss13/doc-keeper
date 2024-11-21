export interface ICreateDocumentDTO {
  code: string;
  title: string;
  emitter: string;
  totalTaxes: string;
  netValue: string;
  documentTypeId: number;
  origin: string;
  createdAt: Date;
  updatedAt: Date;
}
