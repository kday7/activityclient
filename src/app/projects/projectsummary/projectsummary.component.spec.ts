import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsummaryComponent } from './projectsummary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectSummaryService } from '../projectsummary.service';
import { ApplicationSettings } from '../../app.settings';
import { of } from 'rxjs';
import { ProjectsService } from '../projects.service';

const projectSummaryServiceStub = {
  getProjectSummary() {
    const projects = [{id: 1}];
    return of(projects, async);
  }
};

describe('ProjectsummaryComponent', () => {
  let component: ProjectsummaryComponent;
  let fixture: ComponentFixture<ProjectsummaryComponent>;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);
    const projectsSpy = jasmine.createSpyObj('ProjectsService', ['getProjects', 'extractData']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ProjectsummaryComponent ],
      providers: [
        {provide: ProjectSummaryService, useValue: projectSummaryServiceStub},
        {provide: ProjectsService, useValue: projectsSpy},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
