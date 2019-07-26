import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { TaskService } from '../../projects/task.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    const tasksSpy = jasmine.createSpyObj('TaskService', ['getTasks']);
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['setTheme', 'getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: 'activities' }}},
        {provide: TaskService, useValue: tasksSpy},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
