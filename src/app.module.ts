import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    // TYPEORM MODULE
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      
      password: '00000', 
      database: 'Mid_project',  
      autoLoadEntities: true,
      synchronize: true,        
    }),
    // MAILER MODULE
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'use your email here for sending email',      
          pass: 'and your email app password here', 
        },
      },
    }),

    DepartmentModule,
    EmployeeModule,
    ProjectModule,
    AuthModule,
  ],
})
export class AppModule {}