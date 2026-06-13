import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const paths = [
      join(process.cwd(), 'public/assets/i18n', `${lang}.json`), // dev
      join(process.cwd(), 'dist/focumeu/browser/assets/i18n', `${lang}.json`), // prod
    ];

    for (const filePath of paths) {
      if (existsSync(filePath)) {
        try {
          return of(JSON.parse(readFileSync(filePath, 'utf8')));
        } catch (e) {
          console.error(`[SSR] Error parsing translation file: ${filePath}`, e);
        }
      }
    }

    console.warn(`[SSR] Translation not found for: ${lang}`);
    return of({});
  }
}
