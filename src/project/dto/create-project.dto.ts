import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString({ message: 'Project title must be a string' })
  @IsNotEmpty({ message: 'Project title is required' })
  @MinLength(3, { message: 'Project title must be at least 3 characters' })
  @MaxLength(100, { message: 'Project title cannot exceed 100 characters' })
  title!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Budget must be a number' })
  @Min(0, { message: 'Budget cannot be negative' })
  budget!: number;
}