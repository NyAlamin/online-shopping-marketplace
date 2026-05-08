import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private repo: Repository<Department>,
  ) {}

  create(dto: CreateDepartmentDto) {
    const department = this.repo.create(dto);
    return this.repo.save(department);
  }

  findAll() {
    return this.repo.find({ relations: ['employees'] });
  }

  async findOne(id: number) {
    const department = await this.repo.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async fullUpdate(id: number, dto: CreateDepartmentDto) {
    const department = await this.findOne(id);
    Object.assign(department, dto);
    return this.repo.save(department);
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    Object.assign(department, dto);
    return this.repo.save(department);
  }

  async remove(id: number) {
    const department = await this.repo.findOneBy({ id });
    if (!department){
            throw new NotFoundException('Department not found');

    } 

    await this.repo.remove(department);
    return { message: 'Department deleted successfully' };
    
}

}