import { HttpResponse } from '@angular/common/http';

export class SearchResultsCache {
    searchText: string;
    searchResults: HttpResponse<any>;

    public isCached(text: string): boolean {
        return text === this.searchText;
    }

    public put(text: string, results: HttpResponse<any>): void {
        this.searchText = text;
        this.searchResults = results;
    }

    public get(text: string): HttpResponse<any> {
        if (this.searchText === text) {
            return this.searchResults;
        } else {
            return undefined;
        }
    }
}
