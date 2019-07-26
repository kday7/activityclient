import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ApplicationSettings } from '../app.settings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient,
    private appSettings: ApplicationSettings) { }

    private extractData(res: Response) {
      const body = res;
      return body || { };
    }

    getProperties(): Observable<any> {
      console.log('properties.service.ts: Fetching properties');
      return this.http.get(this.endpoint + 'settings/').pipe(
        tap(data => console.log('Output from getProperties()' + JSON.stringify(data))),
        map(this.extractData));
    }

    shutDownServer(): void {
      console.log('properties.service.ts: Shutting down the server');
      this.http.post(environment.apiUrl + '/ShutDown', null, this.httpOptions).subscribe(res => console.log(res));
    }
}
