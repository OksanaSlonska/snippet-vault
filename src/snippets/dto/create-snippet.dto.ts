import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
