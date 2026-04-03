import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, } from 'typeorm';
import { Department } from '../department/department.entity';
import { Project } from '../project/project.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column('float')
  salary!: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'SET NULL',
  })
  department!: Department;

  @ManyToMany(() => Project, (project) => project.employees, {
    cascade: true,
  })
  @JoinTable()
  projects!: Project[];
}