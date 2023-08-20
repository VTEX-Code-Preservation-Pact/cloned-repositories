import { I18nJsonParser } from 'nestjs-i18n';
import { join } from 'path';

export default () => ({
  fallbackLanguage: 'en',
  parser: I18nJsonParser,
  parserOptions: {
    path: join(__dirname, '../assets/lang/'),
    watch: true,
  },
});
