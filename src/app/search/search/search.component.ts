import { Component, OnInit, DoCheck } from '@angular/core';
import { SearchResult } from './search.result';
import { ApplicationSettings } from 'src/app/app.settings';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, DoCheck {

  hub = 'MyHub';

  searchText: string;
  results = new Array<SearchResult>();

  constructor(private appSettings: ApplicationSettings,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    this.searchText = this.route.snapshot.queryParams.text;
  }

  ngDoCheck() {
    console.log('search.component: Checking');
    this.results = (this.route.snapshot.data.searchResults._embedded === undefined) ? 
        new Array<SearchResult>() : 
        this.route.snapshot.data.searchResults._embedded.searchResultResourceList;
  }

  search(): void {
    console.log(`search.component: Searching for ${this.searchText}`);
    this.router.navigate(['/', this.hub, 'search'], { queryParams: { text: this.searchText } });
  }

}
