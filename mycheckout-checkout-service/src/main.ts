import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api/checkout`);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  //for service in validator constraint
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(8080);
}
bootstrap();
