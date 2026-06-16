import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { ServerTranslateLoader } from './translate-loader.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideTranslateService({
      lang: 'it',
      fallbackLang: 'it',
      loader: {
        provide: TranslateLoader,
        useClass: ServerTranslateLoader,
      },
    }),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
