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
import { fastifyStatic } from '@fastify/static';
import { join } from 'path';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: WinstonModule.createLogger({
      transports: [new ConsoleTransport()],
    }),
  });

  app.register(fastifyRawBody);

  // app.register(fastifyHelmet, {
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: [`'self'`],
  //       styleSrc: [`'self'`, `'unsafe-inline'`],
  //       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //     },
  //   },
  //   crossOriginEmbedderPolicy: false,
  // });

  app.register(fastifyCors, {
    origin: process.env.WEBSERVICE_ALLOWED_ORIGIN,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Cross-Origin-Resource-Policy',
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  app.register(fastifyStatic, {
    root: join(__dirname, 'assets'),
    prefix: '/assets',
    list: true,
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

  app.get(Logger).log(`listening ${await app.getUrl()}`);
})();
