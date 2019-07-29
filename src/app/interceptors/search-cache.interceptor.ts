import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SearchResultsCache } from '../search/search-results.cache';
import { tap } from 'rxjs/operators';

@Injectable()
export class SearchCacheInterceptor implements HttpInterceptor {

    CACHABLE_URL = 'Search?text=';

    constructor(private cache: SearchResultsCache) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRequestCachable(req)) {
            console.log(`SearchCacheInterceptor: Search request not cachable (${req.url})`);
            return next.handle(req);
        }

        const searchText: string = req.url.substr(req.url.lastIndexOf(this.CACHABLE_URL) + this.CACHABLE_URL.length);
        console.log(`SearchCacheInterceptor: Search text: ${searchText}`);

        const cachedResponse = this.cache.get(searchText);
        if (cachedResponse !== undefined) {
            return of(cachedResponse);
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.put(searchText, event);
                }
            })
        );
    }

    private isRequestCachable(req: HttpRequest<any>) {
        return (req.method === 'GET') && (req.url.indexOf(this.CACHABLE_URL) > -1);
    }
}
