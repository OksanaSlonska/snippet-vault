import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet, SnippetDocument } from './schemas/snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto) {
    try {
      const newSnippet = new this.snippetModel({
        title: createSnippetDto.title,
        content: createSnippetDto.content,
        type: createSnippetDto.type || 'note',
        tags: createSnippetDto.tags || [],
      });

      return await newSnippet.save();
    } catch (error) {
      console.error('Помилка при збереженні в БД:', error);
      throw error;
    }
  }

  async findAll(
    q?: string,
    tag?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const query: Record<string, any> = {};

    if (q) {
      query.$text = { $search: q };
    }

    if (tag) {
      query.tags = tag;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.snippetModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.snippetModel.countDocuments(query),
    ]);

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet)
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    return snippet;
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
    const updated = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Snippet with ID ${id} not found`);
    return { deleted: true };
  }
}
