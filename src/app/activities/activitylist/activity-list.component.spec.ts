import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ActivityListComponent } from './activity-list.component';
import { ActivitiesService } from '../activities.service';
import { ApplicationSettings } from '../../app.settings';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;

  let activitiesServiceSpy: jasmine.SpyObj<ActivitiesService>;
  const mockActivitiesService = jasmine.createSpyObj(['getActivities']);

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ActivitiesService', ['getActivities']);
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: 'activities' }}},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: ActivitiesService, useValue: spy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    // activitiesServiceSpy = TestBed.get(ActivitiesService);
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with 5 columns', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('tr')).queryAll(By.css('th')).length).toBe(5);
  });

  it('should have an active button with a label of New', () => {
    fixture.detectChanges();
    const componentElement: HTMLElement = fixture.nativeElement;
    const newButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=create-activity-button]');

    expect(newButtonElement.innerText).toBe('New');
    expect(newButtonElement.disabled).toBeFalsy();
  });

});
