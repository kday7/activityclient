import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogHandler } from '../shared/loghandler';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

    constructor( private logHandler: LogHandler ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`LogResponseInterceptor: ${req.url}`);

        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log('LogResponseInterceptor:');
                    console.log(` Status code: ${event.status}`);
                    console.log(event.body);
                    this.logHandler.logMessage(`Call to ${event.url} returned status code: ${event.status}`);
                }
            })
        );
    }
}
