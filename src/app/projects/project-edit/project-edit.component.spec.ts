import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ProjectEditComponent } from './project-edit.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from '../../app.settings';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project-list/project';

describe('ProjectEditComponent', () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;

  // const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProject', 'createProject', 'updateProject']);
  const projectsSpy = jasmine.createSpyObj('ProjectsService', ['getProjects', 'getProject', 'createProject', 'updateProject']);

  beforeEach(async(() => {
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
      declarations: [ ProjectEditComponent ],
      providers: [
        {provide: ProjectsService, useValue: projectsSpy},
        {provide: ActivatedRoute, useValue: {snapshot: { data: {project: new Project(-1,'Test','testView',5) }}}},    // this.route.snapshot.data.project
        {provide: Router, useValue: {navigate: ''}},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Project Details" in a level 1 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const title = componentElement.querySelector('h1');
    expect(title.textContent).toEqual('Project Details');
  });

  it('should display the project name in a level 3 heading', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const h3 = componentElement.querySelector('h3');
    expect(h3.textContent).toEqual('Test');
  });

  it('should display the project name in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
      expect(nameInputElement.value).toEqual('Test');
    });
  });

  it('should display the project view in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const viewInputElement: HTMLInputElement = componentElement.querySelector('input[name=view]');
      expect(viewInputElement.value).toEqual('testView');
    });
  });

  it('should display the project group in an input box', () => {
    fixture.whenStable().then(() => {
      const componentElement: HTMLElement = fixture.nativeElement;
      const groupInputElement: HTMLInputElement = componentElement.querySelector('input[name=group]');
      expect(groupInputElement.value).toEqual('5');
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
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();
      expect(formElement.checkValidity()).toBeFalsy('Form should be invalid');
    });
  }));

  it('should display a Save button for an existing project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-project-button]');
    fixture.componentInstance.project.identifier = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(editButtonElement.textContent).toBe(' Save ');
    });
  });

  it('should display a Create button for a new project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-project-button]');
    expect(editButtonElement.textContent).toBe(' Create ');
  });

  it('should display a Delete button for an existing project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const deleteButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=delete-project-button]');
    fixture.componentInstance.project.identifier = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(deleteButtonElement.textContent).toBe(' Delete ');
    });
  });

  it('should not display a Delete button for a new project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const deleteButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=delete-project-button]');
    expect(deleteButtonElement).toBeFalsy();
  });

  it('should display an Archive button for an existing project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const archiveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=archive-project-button]');
    fixture.componentInstance.project.identifier = 10;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(archiveButtonElement.textContent).toBe(' Archive ');
    });
  });

  it('should not display an Archive button for a new project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const archiveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=archive-project-button]');
    expect(archiveButtonElement).toBeFalsy();
  });

  it('should display a Cancel button', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const cancelButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=cancel-project-button]');
    expect(cancelButtonElement).toBeTruthy();
  });

  it('should disable the save button when invalid', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const saveButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-project-button]');
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

  it('should update the view when changing the name', fakeAsync(() => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const nameInputElement: HTMLInputElement = componentElement.querySelector('input[name=name]');
    const viewInputElement: HTMLInputElement = componentElement.querySelector('input[name=view]');

    nameInputElement.value = 'New Name';
    nameInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      tick();
      expect(nameInputElement.value).toBe('New Name');
      expect(viewInputElement.value).toBe('newName');
    });
  }));

  it('should create a new project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-project-button]');

    editButtonElement.click();

    fixture.whenStable().then(() => {
      expect(projectsSpy.createProject).toHaveBeenCalled();
    });
  });

  it('should update an existing project', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const editButtonElement: HTMLButtonElement = componentElement.querySelector('button[id=edit-project-button]');
    fixture.componentInstance.project.identifier = 10;

    editButtonElement.click();

    fixture.whenStable().then(() => {
      expect(projectsSpy.updateProject).toHaveBeenCalled();
    });
  });

});
