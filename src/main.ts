import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger setup
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
