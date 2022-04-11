import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { WsResponse } from '@nestjs/websockets';
import { IHelloRespond } from '@synergizer/common';
import * as io from 'socket.io-client';

import { PingPongService } from '../src/ping-pong/ping-pong.service';
import { SocketGateway } from '../src/socket/socket.gateway';

async function createNestApp(...gateways: any[]): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('WebSocketGateway', () => {
  let ws: SocketIOClient.Socket, app: INestApplication;

  it('should handle ping-pong communication', async () => {
    app = await createNestApp(SocketGateway, PingPongService);
    await app.listenAsync(3000);

    ws = io.connect('http://localhost:8080');

    await new Promise<void>((resolve) => {
      ws.emit('pings', <IHelloRespond>{
        message: 'ping',
      });
      ws.on('pongs', (data: IHelloRespond) => {
        expect(data).toStrictEqual(<IHelloRespond>{
          message: 'pong',
        });
        resolve();
      });
    });
  });

  afterEach(() => app.close());
});
