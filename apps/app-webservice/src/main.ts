import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { WinstonModule } from 'nest-winston';
import { ConsoleTransport } from '@libraries/lib-nestjs';
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
    origin: [environment.webappUrl],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(`${environment.solutionName} Api`)
        .setVersion(environment.version)
        .addBearerAuth()
        .build()
    )
  );

  app.register(fastifyHelmet, { contentSecurityPolicy: false });

  await app.listen(environment.port, environment.host);

  app.get(Logger).log(`Listening ${environment.protocol}://${environment.host}:${environment.port}`);
})();
