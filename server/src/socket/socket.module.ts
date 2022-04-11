import { Module } from '@nestjs/common';

import { PingPongModule } from '../ping-pong/ping-pong.module';
import { PingPongService } from '../ping-pong/ping-pong.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [PingPongModule],
  providers: [SocketGateway, PingPongService],
})
export class SocketModule {}
