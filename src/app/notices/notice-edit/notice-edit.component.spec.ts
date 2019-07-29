import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NoticeEditComponent } from './notice-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from 'src/app/app.settings';
import { NoticesService } from '../notices.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NoticeEditComponent', () => {
  let component: NoticeEditComponent;
  let fixture: ComponentFixture<NoticeEditComponent>;

  beforeEach(async(() => {
    const noticesSpy = jasmine.createSpyObj('NoticesService', ['getNotices']);
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings',
       {'setTheme': '',
        'getTitle': 'Test',
        'getLogo': 'logo.ico',
        'getActiveHub': 'TestHub'});

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ NoticeEditComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data:
          {notice: {id: 1, detail: 'Test', datePosted: '26/07/2019'} }}}},    // this.route.snapshot.data.notice
        {provide: Router, useValue: {navigate: ''}},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: NoticesService, useValue: noticesSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Notice Details" in a level 1 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h1');
    expect(title.textContent).toEqual('Notice Details');
  });

  it('should display the date posted in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const datePostedInputElement: HTMLInputElement = componentElement.querySelector('input[name=datePosted]');
      expect(datePostedInputElement.value).toEqual('26/07/2019');
    });
  });

  it('should display the details in a text area', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const detailsTextareaElement: HTMLInputElement = componentElement.querySelector('textarea[name=detail]');
      expect(detailsTextareaElement.value).toEqual('Test');
    });
  });

  it('should display a Save button for an existing notice', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-notice-button]');
    fixture.componentInstance.id = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(editButtonElement.textContent).toBe(' Save ');
    });
  });

  it('should display a Create button for a new notice', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-notice-button]');
    // fixture.componentInstance.id = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(editButtonElement.textContent).toBe(' Create ');
    });
  });

  it('should display a Delete button for an existing notice', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const deleteButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=delete-notice-button]');
    fixture.componentInstance.id = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(deleteButtonElement.textContent).toBe(' Delete ');
    });
  });

  it('should not display a Delete button for a new notice', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const deleteButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=delete-notice-button]');
    fixture.detectChanges();
    expect(deleteButtonElement).toBeFalsy('There should be no delete button for new notices');
  });

  it('should display a Cancel button for a new notice', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const cancelButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=cancel-notice-button]');
    fixture.detectChanges();
    expect(cancelButtonElement).toBeTruthy('There should be a cancel button');
  });

  it('should disable the save button when unchanged', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const datePostedInputElement: HTMLInputElement = componentElement.querySelector('input[name=datePosted]');
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-notice-button]');
    // fixture.detectChanges();
    expect(saveButtonElement.disabled).toBeTruthy('Save button should be disabled when data unchanged and valid');

    datePostedInputElement.value = '27/07/2019';   // invalidate the form by deleting the name field
    datePostedInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();
      expect(saveButtonElement.disabled).toBeFalsy('Save button should be enabled');
    });
  }));

  it('should disable the save button when invalid', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const datePostedInputElement: HTMLInputElement = componentElement.querySelector('input[name=datePosted]');
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-notice-button]');

    datePostedInputElement.value = '27/07/2019';   // make the form dirty
    datePostedInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      tick();
      expect(saveButtonElement.disabled).toBeFalsy('Save button should be enabled when data is valid and changed');
    });

    datePostedInputElement.value = '';   // invalidate the form by deleting the date posted field
    datePostedInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();
      expect(saveButtonElement.disabled).toBeTruthy('Save button should be disabled when data is changed and invalid');
    });
  }));

});
