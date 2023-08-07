/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Optional: Add any additional setup for the Fastify instance, if needed.
  // app.getHttpAdapter().getInstance().addHook('onRequest', (req, reply, done) => {
  //   console.log('Fastify onRequest hook');
  //   done();
  // });

  await app.listen(3000);
}
bootstrap();
