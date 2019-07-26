import { TestBed, async } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';

describe('ProjectsService', () => {

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
    const service: ProjectsService = TestBed.get(ProjectsService);
    expect(service).toBeTruthy();
  });
});
