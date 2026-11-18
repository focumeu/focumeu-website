import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import it from '../../public/assets/i18n/it.json';

/**
 * L'italiano (lingua predefinita) è incluso nel bundle: così la pagina
 * pre-renderizzata e quella idratata nel browser hanno subito gli stessi
 * testi, senza richieste HTTP né "lampeggio" delle chiavi di traduzione.
 * Inglese e francese vengono scaricati solo quando servono.
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    if (lang === 'it') return of(it);
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}
