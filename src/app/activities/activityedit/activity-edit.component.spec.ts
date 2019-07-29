import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ActivityEditComponent } from './activity-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from 'src/app/app.settings';
import { ActivitiesService } from '../activities.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

const routerStub = {
  navigate() {}
};

describe('ActivityEditComponent', () => {
  let component: ActivityEditComponent;
  let fixture: ComponentFixture<ActivityEditComponent>;

  const activitiesSpy = jasmine.createSpyObj('ActivitiesService', ['getActivities', 'createActivity', 'updateActivity']);

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ ActivityEditComponent ],
      imports: [FormsModule],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: {activity: {id: -1, name: 'Test', link: 'link', icon: 'ico'} }}}},
        {provide: Router, useValue: routerStub},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: ActivitiesService, useValue: activitiesSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // @see https://angular.io/guide/testing

  it('should contain "Activity Details" in a level 1 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h1');
    expect(title.textContent).toEqual('Activity Details');
  });

  it('should display the activity name in a level 3 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const h3 = componentElement.querySelector('h3');
    expect(h3.textContent).toEqual('Test');
  });

  it('should display the activity name in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
      expect(nameInputElement.value).toEqual('Test');
    });
  });

  it('should display the activity link in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const linkInputElement: HTMLInputElement = componentElement.querySelector('input[name=link]');
      expect(linkInputElement.value).toEqual('link');
    });
  });

  it('should display the activity icon in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const iconInputElement: HTMLInputElement = componentElement.querySelector('input[name=icon]');
      expect(iconInputElement.value).toEqual('ico');
    });
  });

  it('should create a new activity', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-activity-button]');

    editButtonElement.click();

    fixture.whenStable().then(() => {
      expect(activitiesSpy.createActivity).toHaveBeenCalled();
    });
  });

  it('should display a Create button for a new activity', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-activity-button]');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(saveButtonElement.textContent).toBe(' Create ');
    });
  });

  it('should update an existing activity', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-activity-button]');
    fixture.componentInstance.id = 10;

    editButtonElement.click();

    fixture.whenStable().then(() => {
      expect(activitiesSpy.updateActivity).toHaveBeenCalled();
    });
  });

  it('should display a Save button for an existing activity', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-activity-button]');
    fixture.componentInstance.id = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(saveButtonElement.textContent).toBe(' Save ');
    });
  });

  it('should invalidate the form when name is missing', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const formElement = componentElement.querySelector('form');

    nameInputElement.value = '';   // invalidate the form by deleting the name field
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(formElement.checkValidity()).toBeFalsy('Form should be invalid');
  });

  it('should disable the save button when invalid', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const iconInputElement: HTMLInputElement = componentElement.querySelector('input[name=icon]');
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-activity-button]');
    fixture.detectChanges();
    expect(saveButtonElement.disabled).toBeFalsy();

    iconInputElement.value = '';   // invalidate the form by deleting the icon field
    iconInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    fixture.whenStable().then(() => {
      // fixture.detectChanges();
      tick();
      expect(saveButtonElement.disabled).toBeTruthy();
    });
  }));

});
