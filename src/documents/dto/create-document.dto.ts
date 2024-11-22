import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DocumentOrigin } from '../enums/document-origin.enum';
export class ICreateDocumentDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  emitter: string;

  @Type(() => Number)
  @IsNumber()
  totalTaxes: string;

  @Type(() => Number)
  @IsNumber()
  netValue: string;

  @Type(() => Number)
  @IsNumber()
  documentTypeId: number;

  @IsEnum(DocumentOrigin)
  origin: DocumentOrigin;
}
