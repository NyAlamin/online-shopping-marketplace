import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEmployeeDto){
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }

  @Post(':employeeId/project/:projectId')
  assignProject(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.service.assignProject(+employeeId, +projectId);
  }

  @Delete(':employeeId/project/:projectId')
  removeProject(
    @Param('employeeId') employeeId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.service.removeProject(+employeeId, +projectId);
  }
}