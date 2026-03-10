import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { Snippet, SnippetSchema } from './entities/snippet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class SnippetsModule {}
