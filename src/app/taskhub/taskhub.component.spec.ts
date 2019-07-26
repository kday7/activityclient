import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskhubComponent } from './taskhub.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskhubComponent', () => {
  let component: TaskhubComponent;
  let fixture: ComponentFixture<TaskhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ TaskhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
