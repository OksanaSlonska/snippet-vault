import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    console.log('Дані, що прийшли на сервер:', createSnippetDto);
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('tag') tag?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.snippetsService.findAll(q, tag, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }
}
