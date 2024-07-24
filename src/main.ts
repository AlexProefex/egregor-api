import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExceptionTooManyRequest } from './validation/ExceptionTooManyRequest';
import { json } from 'express';

async function bootstrap() {
  process.env.TZ = "America/Mexico_City";
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.useGlobalFilters(new ExceptionTooManyRequest());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist:true}),);
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
//
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('API Egregor')
  .setDescription('Points of access Egregor')
  .setVersion('1.0')
  .addTag('Egregor')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002);
  console.log("listen in port 3002");
}
bootstrap();