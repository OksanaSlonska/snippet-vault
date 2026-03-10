import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface SnippetDocument extends Document, Snippet {}

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true, enum: ['link', 'note', 'command'] })
  type: string;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({ title: 'text', content: 'text' });
