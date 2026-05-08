import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  // ✅ Any logged in user — create employee (register as employee)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto);
  }

  // ✅ All logged in users — view all employees
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ All logged in users — view one employee
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(+id);
  }

  // ✅ Manager only — full update employee
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @Put(':id')
  fullUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEmployeeDto,
  ) {
    return this.service.fullUpdate(+id, dto);
  }

  // ✅ Any logged in user — partial update (employee edits own profile)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(+id, dto);
  }

  // ✅ Manager only — delete employee
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }

  // ✅ Manager only — assign project to employee
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @Post(':employeeId/project/:projectId')
  assignProject(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.service.assignProject(+employeeId, +projectId);
  }

  // ✅ Manager only — remove project from employee
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('manager')
  @Delete(':employeeId/project/:projectId')
  removeProject(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.service.removeProject(+employeeId, +projectId);
  }

  // ✅ All logged in users — view employee projects
  @UseGuards(JwtAuthGuard)
  @Get(':id/projects')
  getEmployeeProjects(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEmployeeProjects(+id);
  }
}
