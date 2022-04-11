import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IHelloRespond } from '@synergizer/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () =>
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(<IHelloRespond>{ message: 'Hello world!' }));
});
