import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApplicationSettings } from '../../app.settings';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute } from '@angular/router';

describe('ProjectsComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);
    const projectsSpy = jasmine.createSpyObj('ProjectsService', ['getProjects']);

    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ProjectsService, useValue: projectsSpy},
        {provide: ActivatedRoute, useValue: {snapshot: { data: 'projects' }}},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
