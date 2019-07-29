import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitysummaryComponent } from './activitysummary.component';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from 'src/app/app.settings';
import { ActivitiesService } from '../activities.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivitysummaryComponent', () => {
  let component: ActivitysummaryComponent;
  let fixture: ComponentFixture<ActivitysummaryComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ActivitiesService', ['getActivities']);
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ ActivitysummaryComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: {activities: [{id: 1}] }}}},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: ActivitiesService, useValue: spy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitysummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Daily Activities" in a level 3 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h3');
    expect(title.textContent).toEqual('Daily Activities');
  });

  it('should contain a list of activities', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const listElement = componentElement.querySelector('ul');
    expect(listElement).toBeTruthy();
  });

});
