import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Snippet extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'note' })
  type: string;

  @Prop([String])
  tags: string[];
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
