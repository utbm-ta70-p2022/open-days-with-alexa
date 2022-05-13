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
import { fastifyRequestContextPlugin } from '@fastify/request-context';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({}), {
    logger: WinstonModule.createLogger({
      transports: [new ConsoleTransport()],
    }),
  });

  app.register(fastifyRawBody);

  app.register(fastifyHelmet, { crossOriginResourcePolicy: false });

  app.register(fastifyRequestContextPlugin);

  app.register(fastifyCors, {
    origin: process.env.WEBSERVICE_ALLOWED_ORIGIN,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(process.env.WEBSERVICE_NAME)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .setVersion(require('../../../package.json').version)
        .addBearerAuth()
        .build()
    )
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error: ValidationError[]) =>
        new ApiDtoValidationError(new Error(error.map((_) => _.constraints).join(','))),
    })
  );

  await app.listen(Number(process.env.WEBSERVICE_PORT), process.env.WEBSERVICE_HOST);

  app.get(Logger).log(`Listening ${await app.getUrl()}`);
})();
