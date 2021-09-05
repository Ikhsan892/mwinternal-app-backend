import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as fs from 'fs';
// import * as path from 'path' 
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.enableCors({ origin: ['http://localhost:3001','http://192.168.1.103:3001'] });
  app.useStaticAssets(join(__dirname, '..', '/dist/app/files'));
  app.setGlobalPrefix('api');
  await app.listen(3000);

  // let customer = 'ahmad';
  // let path_customer = path.join(__dirname,customer)
  // if(!fs.existsSync(path_customer)){
  //   fs.mkdirSync(path_customer);
  // }
}
bootstrap();
