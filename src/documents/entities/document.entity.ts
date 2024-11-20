import { DocumentOrigin } from '../enums/document-origin.enum';
import { DocumentType } from './document-type.entity';

export class Document {
  private readonly id: string;
  private readonly title: string;
  private readonly code: string;
  private readonly emitter: string;
  private readonly totalTaxes: number;
  private readonly netValue: number;
  private readonly type: DocumentType;
  private readonly origin: DocumentOrigin;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: string,
    code: string,
    title: string,
    emitter: string,
    totalTaxes: number,
    netValue: number,
    type: DocumentType,
    origin: DocumentOrigin,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.emitter = emitter;
    this.totalTaxes = totalTaxes;
    this.netValue = netValue;
    this.type = type;
    this.origin = origin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
