import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { Department } from '../department/department.entity';
import { Project } from '../project/project.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const department = await this.departmentRepo.findOneBy({
      id: dto.departmentId,
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${dto.departmentId} not found`,
      );
    }

    const employee = this.employeeRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      salary: dto.salary,
      department,
    });

    try {
      return await this.employeeRepo.save(employee);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException('Failed to create employee');
    }
  }

  findAll() {
    return this.employeeRepo.find({
      relations: ['department', 'projects'],
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['department', 'projects'],
    });

    if (!employee) {
      throw new NotFoundException(
        `Employee with ID ${id} not found`,
      );
    }

    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (dto.departmentId) {
      const department = await this.departmentRepo.findOneBy({
        id: dto.departmentId,
      });

      if (!department) {
        throw new NotFoundException(
          `Department with ID ${dto.departmentId} not found`,
        );
      }

      employee.department = department;
    }

    Object.assign(employee, dto);

    try {
      return await this.employeeRepo.save(employee);
    } catch (error:any) {
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException('Failed to update employee');
    }
  }

  async remove(id: number) {
    const employee = await this.findOne(id);

    try {
      return await this.employeeRepo.remove(employee);
    } catch {
      throw new BadRequestException('Failed to delete employee');
    }
  }

  async assignProject(employeeId: number, projectId: number) {
    const employee = await this.findOne(employeeId);

    const project = await this.projectRepo.findOneBy({
      id: projectId,
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${projectId} not found`,
      );
    }

    if (!employee.projects) {
      employee.projects = [];
    }

    employee.projects.push(project);

    try {
      return await this.employeeRepo.save(employee);
    } catch {
      throw new BadRequestException('Failed to assign project');
    }
  }

  async removeProject(employeeId: number, projectId: number) {
    const employee = await this.findOne(employeeId);

    if (!employee.projects || employee.projects.length === 0) {
      throw new NotFoundException('No projects assigned to this employee');
    }

    const projectExists = employee.projects.some(
      (p) => p.id === projectId,
    );

    if (!projectExists) {
      throw new NotFoundException(
        `Project with ID ${projectId} is not assigned to this employee`,
      );
    }

    employee.projects = employee.projects.filter(
      (p) => p.id !== projectId,
    );

    try {
      return await this.employeeRepo.save(employee);
    } catch {
      throw new BadRequestException('Failed to remove project');
    }
  }
}
