import { GatewayMetadata, WebSocketGateway } from '@nestjs/websockets';

export const WebsocketGateway = (): ClassDecorator => {
  return WebSocketGateway({
    cors: {
      origin: process.env.WEBSERVICE_ALLOWED_ORIGIN,
    },
  } as GatewayMetadata);
};
