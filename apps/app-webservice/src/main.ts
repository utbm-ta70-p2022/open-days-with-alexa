import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { WinstonModule } from 'nest-winston';
import { ApiDtoValidationError, ConsoleTransport } from '@libraries/lib-nestjs';
import { fastifyHelmet } from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyRawBody from 'fastify-raw-body';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: WinstonModule.createLogger({
      transports: [new ConsoleTransport()],
    }),
  });

  app.register(fastifyRawBody);

  app.register(fastifyCors, {
    origin: [process.env.WEBSERVICE_ALLOWED_ORIGINS],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(process.env.WEBSERVICE_NAME)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .setVersion(require('../../../package.json').version)
        .addBearerAuth()
        .build()
    )
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error: ValidationError[]) =>
        new ApiDtoValidationError(error.map((_) => _.constraints).join(',')),
    })
  );

  app.register(fastifyHelmet, { contentSecurityPolicy: false });

  await app.listen(Number(process.env.WEBSERVICE_PORT), process.env.WEBSERVICE_HOST);

  app
    .get(Logger)
    .log(`Listening ${process.env.WEBSERVICE_SCHEMA}://${process.env.WEBSERVICE_HOST}:${process.env.WEBSERVICE_PORT}`);
})();
