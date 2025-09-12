import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, //Mas estricto con los DTO
      transform: true, //Si vamos a usar type en una relacion agregamos transform para que este sea admitido
    }),
  ); //Aqui
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
