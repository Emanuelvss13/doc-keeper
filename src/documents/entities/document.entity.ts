import { DocumentOrigin } from '../enums/document-origin.enum';
import { DocumentType } from './document-type.entity';

export class Document {
  private readonly id: string;
  private readonly title: string;
  private code: string;
  private readonly emitter: string;
  private readonly totalTaxes: number;
  private readonly netValue: number;
  private readonly type: DocumentType;
  private readonly origin: DocumentOrigin;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  private readonly storagePath: string;

  private url: string;

  constructor(
    id: string,
    title: string,
    emitter: string,
    totalTaxes: number,
    netValue: number,
    type: DocumentType,
    origin: DocumentOrigin,
    storagePath: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.emitter = emitter;
    this.totalTaxes = totalTaxes;
    this.netValue = netValue;
    this.type = type;
    this.origin = origin;
    this.storagePath = storagePath;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.setCode();
  }

  setCode() {
    this.code = this.id.split('-')[4];
  }

  setUrl(url: string) {
    this.url = url;
  }

  getFilenameInStorage() {
    return this.storagePath.split('/')[1];
  }
}
