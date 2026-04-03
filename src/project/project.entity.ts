import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('float')
  budget!: number;

  @ManyToMany(() => Employee, (employee) => employee.projects)
  employees!: Employee[];
}