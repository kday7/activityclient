import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ApplicationSettings } from 'src/app/app.settings';
import { SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const routerStub = {
  navigate() {}
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);
    const searchSpy = jasmine.createSpyObj('SearchService', ['search']);

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: {snapshot: {  // this.route.snapshot.queryParams.text
          queryParams: {text: ''},
          data: {searchResults: {_embedded: {
            project: 'Project 1',
            task: {id: -1, name: 'New Task', location: 'link', view: 'view', category: 'TASK', status: 'TODO'}
          }}}
        }}},
        {provide: SearchService, useValue: searchSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
