import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
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

  it('/cards (GET) ERROR Employment missing', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=&income=15000');
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.reason.includes('Missing employment information')).toBeTruthy();
  });

  it('/cards (GET) ERROR Income missing', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=student&income=');
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.reason.includes('Missing income information')).toBeTruthy();
  });

  it('/cards (GET) Eligible Anywhere and Liquid cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=full-time&income=34000');
    expect(response.body).toEqual({"eligibles": ['Anywhere Card', 'Liquid Card']});
  });

  it('/cards (GET) Eligible Anywhere, Liquid and Student cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=student&income=17000');
    expect(response.body).toEqual({"eligibles": ['Student Life', 'Anywhere Card', 'Liquid Card']});
  });

  it('/cards (GET) Eligible Anywhere card', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards?employment=part-time&income=15000');
    expect(response.body).toEqual({"eligibles": ['Anywhere Card']});
  });

  it('/cards/details (GET) details on Anywhere card', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards/details?card=Anywhere Card');
    expect(response.body.details).toEqual({
      'id': 2,
      'name': 'Anywhere Card',
      'apr':
        33.9,
      'balance':
        0,
      'purchase':
        0,
      'credit':
        300,
    });
  });
});
