import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DynamooseModuleAsyncOptions,
  DynamooseModuleOptions,
} from 'nestjs-dynamoose';

export default (): DynamooseModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: async (
    config: ConfigService,
  ): Promise<DynamooseModuleOptions> => {
    const region = config.get<string>('DB_REGION', 'localhost');
    return {
      aws: {
        accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID', 'ios2p9'),
        secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY', 'qj4ch9'),
        region: region,
      },
      model: { prefix: `${config.get<string>('DB', 'checkout')}.` },
      local: region == 'localhost',
    };
  },
  inject: [ConfigService],
});
