import { TestBed, async } from '@angular/core/testing';

import { PropertiesService } from './properties.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';

describe('PropertiesService', () => {

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    }).compileComponents();

  }));

  it('should be created', () => {
    const service: PropertiesService = TestBed.get(PropertiesService);
    expect(service).toBeTruthy();
  });
});
