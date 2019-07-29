import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ApplicationSettings } from '../app.settings';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectSummaryService {

    endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

    constructor(private http: HttpClient,
        private appSettings: ApplicationSettings) { }

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    getProjectSummary(): Observable<any> {
        console.log('projectsummary.service.ts: Fetching project summary');
        console.log('projectsummary.service: Summary URL: ' + this.endpoint + 'Projects/summary');
        return this.http.get(this.endpoint + 'Projects/summary').pipe(
            tap(data => console.log('Output from getProjectSummary()' + JSON.stringify(data))),
            map(this.extractData)
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
