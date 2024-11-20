import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
  decimal,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const documentTypes = pgTable('document_types', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(), // UUID ou similar
  title: text('title').notNull(),
  code: text('code').notNull(),
  emitter: text('emitter').notNull(),
  totalTaxes: decimal('total_taxes').notNull(),
  netValue: decimal('net_value').notNull(),
  type: serial('type_id')
    .notNull()
    .references(() => documentTypes.id),
  origin: text('origin').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const documentTypesRelations = relations(documentTypes, ({ many }) => ({
  documentTypes: many(documents), // Um DocumentType pode ter muitos Documents
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  documentType: one(documentTypes, {
    fields: [documents.type], // Campo local em `documents`
    references: [documentTypes.id], // Campo referenciado em `documentTypes`
  }),
}));

// Tipagem do modelo baseado no schema
export type DocumentType = InferSelectModel<typeof documents>;
export type NewDocumentType = InferInsertModel<typeof documents>;
