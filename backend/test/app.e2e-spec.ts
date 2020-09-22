import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cards (GET) Eligible Anywhere and Liquid cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=full-time&income=34000')
    expect(response.body).toEqual(["Anywhere Card", "Liquid Card"])
  });

  it('/cards (GET) Eligible Anywhere, Liquid and Student cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=student&income=17000')
    expect(response.body).toEqual(["Anywhere Card", "Liquid Card", "Student Life"])
  });

  it('/cards (GET) Eligible Anywhere cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=part-time&income=15000')
    expect(response.body).toEqual(["Anywhere Card"])
  });
});
