import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { SearchResult } from './search.result';


@Injectable()
export class SearchResolver implements Resolve<any> {

  constructor(public searchService: SearchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SearchResult[]> {
    const searchText: string = route.queryParams.text;
    console.log('SearchResolver: Search text: ' + searchText );

    if (searchText !== undefined || searchText !== null) {
      return this.searchService.search(searchText);
    }

    return null;
  }
}
