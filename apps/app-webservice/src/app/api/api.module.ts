import { Global, Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { environment } from '../../environments/environment';
import { join } from 'path';

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      fallbacks: {
        'fr-*': 'fr',
        'en-*': 'en',
      },
      logging: false,
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, 'assets', 'translations'),
        watch: !environment.production,
      },
      resolvers: [new AcceptLanguageResolver()],
    }),
  ],
  controllers: [],
})
export class ApiModule {}
