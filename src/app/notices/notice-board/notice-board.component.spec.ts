import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBoardComponent } from './notice-board.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from 'src/app/app.settings';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoticesService } from '../notices.service';

const routerStub = {
  navigate() {}
};

describe('NoticeBoardComponent', () => { 
  let component: NoticeBoardComponent;
  let fixture: ComponentFixture<NoticeBoardComponent>;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);
    const spy = jasmine.createSpyObj('NoticesService', ['getNotices']);

    TestBed.configureTestingModule({
      declarations: [ NoticeBoardComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: {activities: [{id: 1}] }}}},
        {provide: Router, useValue: routerStub},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: NoticesService, useValue: spy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Notice Board" in a level 1 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h1');
    expect(title.textContent).toEqual('Notice Board');
  });

  it('should have an active button with a label of Add', () => {
    fixture.detectChanges();
    const componentElement: HTMLElement = fixture.nativeElement;
    const addButtonElement: HTMLButtonElement = componentElement.querySelector('button');

    expect(addButtonElement.innerText).toBe('Add');
    expect(addButtonElement.disabled).toBeFalsy();
  });

});
