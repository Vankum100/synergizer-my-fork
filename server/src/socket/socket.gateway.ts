import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { HelloRespondDto } from '../ping-pong/dto/hello-respond.dto';
import { PingPongService } from '../ping-pong/ping-pong.service';

@WebSocketGateway(8080, {
  connectTimeout: parseInt(process.env.WS_CONNECT_TIMEOUT as string, 10),
  path: process.env.WS_PATH,
})
@UsePipes(
  new ValidationPipe({
    skipMissingProperties: false,
    forbidNonWhitelisted: true,
  })
)
export class SocketGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() public server!: Server;
  private logger: Logger = new Logger('SocketGateway');

  constructor(private pingPong: PingPongService) {}

  public afterInit() {
    return this.logger.log('Initialized');
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('pings')
  handleEvent(
    @MessageBody() data: HelloRespondDto,
    @ConnectedSocket() client: Socket
  ): WsResponse<HelloRespondDto> {
    this.logger.log(
      `Received data from ${client.id} is ${JSON.stringify(data)}`
    );
    return {
      data: this.pingPong.sendPong(),
      event: 'pongs',
    };
  }
}
