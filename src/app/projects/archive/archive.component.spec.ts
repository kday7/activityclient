import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { TaskService } from '../task.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectsService } from '../projects.service';

const routerStub = {
  navigate() {}
};

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    const taskSpy = jasmine.createSpyObj('TaskService', ['getTasks']);
    const projectsSpy = jasmine.createSpyObj('ProjectsService', ['getTasks']);
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ ArchiveComponent ],
      providers: [ 
        {provide: ProjectsService, useValue: projectsSpy},
        {provide: TaskService, useValue: taskSpy},
        {provide: ActivatedRoute, useValue: {snapshot: { data: {activity: {id: 1} }}}},
        {provide: Router, useValue: routerStub},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
