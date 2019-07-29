import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '../app.settings';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchResult } from './search/search.result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

  constructor(private http: HttpClient,
              private appSettings: ApplicationSettings) {
  }

  search(searchText: string): Observable<SearchResult[]> {
    const searchUrl = this.endpoint + 'Search?text=' + searchText;
    console.log('Search URL: ' + searchUrl);

    return this.http.get<SearchResult[]>(searchUrl).pipe(
      // map(this.extractData)
    );
  }
}
