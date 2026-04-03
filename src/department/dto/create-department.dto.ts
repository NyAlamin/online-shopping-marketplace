import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString({ message: 'Department name must be a string' })
  @IsNotEmpty({ message: 'Department name is required' })
  @MinLength(3, { message: 'Department name must be at least 3 characters' })
  @MaxLength(50, { message: 'Department name cannot exceed 50 characters' })
  name!: string;

  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  @MinLength(2, { message: 'Location must be at least 2 characters' })
  @MaxLength(50, { message: 'Location cannot exceed 50 characters' })
  location!: string;
}