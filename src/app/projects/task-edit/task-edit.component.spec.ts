import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { TaskService } from '../task.service';

const routerStub = {
  navigate() {}
};

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTask', 'createTask', 'updateTask']);

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

    TestBed.configureTestingModule({
      declarations: [ TaskEditComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        {provide: TaskService, useValue: taskServiceSpy},
        {provide: ActivatedRoute, useValue: {snapshot: {
            params: {projectid: 1, taskid: 2},
            data: {
              project: 'Project 1',
              task: {identifier: -1, name: 'New Task', location: 'link', view: 'view', category: 'TASK', status: 'TODO'}
            }
        }}}, 
        {provide: Router, useValue: routerStub},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Task Details" in a level 1 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h1');
    expect(title.textContent).toEqual('Task Details');
  });

  it('should display the task name in a level 3 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const h3 = componentElement.querySelector('h3');
    expect(h3.textContent).toEqual('New Task');
  });

  it('should display the task name in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
      expect(nameInputElement.value).toEqual('New Task');
    });
  });

  it('should display a Save button for an existing task', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-task-button]');
    fixture.componentInstance.task.identifier = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(editButtonElement.textContent).toBe(' Save ');
    });
  });

  it('should invalidate the form when name is missing', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const formElement = componentElement.querySelector('form');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      tick();
      expect(formElement.checkValidity()).toBeTruthy('Form should be valid');
    });

    nameInputElement.value = '';   // invalidate the form by deleting the name field
    nameInputElement.dispatchEvent(new Event('input'));
    // fixture.componentInstance.task.name = '';
    fixture.detectChanges();
    // tick();

    fixture.whenStable().then(() => {
      tick();
      expect(formElement.checkValidity()).toBeFalsy('Form should be invalid');
    });
  }));

  it('should disable the save button when invalid', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-task-button]');
    // fixture.detectChanges();
    expect(saveButtonElement.disabled).toBeFalsy();

    nameInputElement.value = '';   // invalidate the form by deleting the name field
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();
      expect(saveButtonElement.disabled).toBeTruthy('Save button should be disabled');
    });
  }));

  it('should update the location when changing the name', fakeAsync(() => {
    // spyOn(fixture.nativeElement, 'nameChanged');

    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const linkInputElement: HTMLInputElement = componentElement.querySelector('input[name=link]');

    nameInputElement.value = 'New Name';
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // tick();

    fixture.whenStable().then(() => {
      tick();

      // expect(component.nameChanged).toHaveBeenCalled();
      expect(nameInputElement.value).toBe('New Name');
      expect(linkInputElement.value).toBe('project1/newName');
    });
  }));

  it('should update the view when changing the name', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const viewInputElement: HTMLInputElement = componentElement.querySelector('input[name=view]');

    nameInputElement.value = 'New Name';
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();

      // expect(component.nameChanged).toHaveBeenCalled();
      expect(nameInputElement.value).toBe('New Name');
      expect(viewInputElement.value).toBe('newName');
    });
  }));

  it('should create a new task', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-task-button]');

    editButtonElement.click();

    // taskServiceSpy.createTask.and.returnValue();

    fixture.whenStable().then(() => {
      expect(taskServiceSpy.createTask).toHaveBeenCalled();
    });
  });

  it('should update an existing task', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-task-button]');
    fixture.componentInstance.task.identifier = 10;

    editButtonElement.click();

    // taskServiceSpy.updateTask.and.returnValue();

    fixture.whenStable().then(() => {
      expect(taskServiceSpy.updateTask).toHaveBeenCalled();
    });
  });

});
