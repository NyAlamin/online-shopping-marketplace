import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Department } from '../department/department.entity';
import { Project } from '../project/project.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Project])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}