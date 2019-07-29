import { TestBed, async } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchService', () => {

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', {
      'getActiveHub': 'TestHub'
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
