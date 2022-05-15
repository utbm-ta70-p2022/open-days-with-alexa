import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@libraries/lib-nestjs';
import { MainGateway } from './gateways/main.gateway';
import { InformationsService } from './services/informations.service';
import { AlexaSkillsService } from './services/alexa-skills.service';

const SERVICES = [InformationsService, AlexaSkillsService];

const STRATEGIES = [JwtStrategy];

const ENTITIES = [];

const GATEWAYS = [MainGateway];

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.WEBSERVICE_JWT_SECRET,
      signOptions: {
        expiresIn: process.env.WEBSERVICE_JWT_EXPIRATION_TIME,
      },
    }),
    PassportModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  providers: [...SERVICES, ...STRATEGIES, ...GATEWAYS],
  exports: [...SERVICES, ...STRATEGIES, ...GATEWAYS, JwtModule, TypeOrmModule, HttpModule, PassportModule],
})
export class DomainModule {}
