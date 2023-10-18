import { NestFactory } from '@nestjs/core';
import { AppModule } from './ioC/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const port = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
//
  await app.listen(port);

  console.log(`Server started on port ${port}!`);
}

void bootstrap();
