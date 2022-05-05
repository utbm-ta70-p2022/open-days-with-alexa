import { GatewayMetadata, WebSocketGateway } from '@nestjs/websockets';

export const WebsocketGateway = (): ClassDecorator => {
  return WebSocketGateway(Number(process.env.WEBSERVICE_PORT), {
    cors: {
      origin: process.env.WEBSERVICE_ALLOWED_ORIGIN,
    },
  } as GatewayMetadata);
};
