import { NestFactory } from '@nestjs/core';
// import * as fs from 'fs';
// import * as path from 'path'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // let customer = 'ahmad';
  // let path_customer = path.join(__dirname,customer)
  // if(!fs.existsSync(path_customer)){
  //   fs.mkdirSync(path_customer);
  // }
}
bootstrap();
