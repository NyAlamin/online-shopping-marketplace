import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Enable CORS (important for frontend/Postman)
  // app.enableCors();

  // Global API prefix
  //app.setGlobalPrefix('api');

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unwanted fields
      forbidNonWhitelisted: true, // throw error for extra fields
      transform: true, // auto transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);

  console.log("Server running on http://localhost:3000/api");
}

bootstrap();
