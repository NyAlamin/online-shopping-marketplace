import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsNumber, Min, } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateEmployeeDto {

  @Transform(({ value }) => value.trim().replace(/\s+/g, ' '))
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(3, { message: 'Full name must be at least 3 characters' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  fullName!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Salary must be a number' })
  @Min(0, { message: 'Salary cannot be negative' })
  salary!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Department ID must be a number' })
  departmentId!: number;
}