import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

//para usar Fastify
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter);
  
  //para mensajes por la terminal
  const logger = new Logger('bootstrap')


  //Usar las validaciones para los Dto(Data object transfer)
  app.useGlobalPipes(new ValidationPipe({forbidNonWhitelisted:true})) //Si se establece en verdadero, en lugar de eliminar las propiedades no incluidas en la lista blanca, el validador arrojará un error

  await app.listen(3000, '0.0.0.0');

  logger.log(`servidor corriendo por el puerto 3000`);
  logger.warn(`mensaje de prueba`);
}
bootstrap();
