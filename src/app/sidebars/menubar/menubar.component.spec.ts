import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarComponent } from './menubar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from '../../app.settings';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProjectsService } from 'src/app/projects/projects.service';


describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  const projects = [
    {id: 1, name: 'Proj1', view: 'tests', group: 5}
  ];

  const settingsSpy = jasmine.createSpyObj('ApplicationSettings',
        ['setTheme', 'getTitle', 'getLogo', 'getActiveHub']);
  const projectsServiceSpy = jasmine.createSpyObj('ProjectsService', 
        ['getProjects', 'getProjectsLastUpdated', 'convertProjects']);

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ MenubarComponent ],
      providers: [
        {provide: ProjectsService, useValue: projectsServiceSpy},
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    })
    .compileComponents();

    settingsSpy.getTitle.and.returnValue('Test Hub');
    settingsSpy.getLogo.and.returnValue('hub.ico');
    settingsSpy.getActiveHub.and.returnValue('TestHub');

    projectsServiceSpy.getProjectsLastUpdated.and.returnValue(new EventEmitter<number>());
    projectsServiceSpy.getProjects.and.returnValue(of(projects));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the correct settings', () => {
    expect(component.title).toBe('Test Hub');
    expect(component.logo).toBe('hub.ico');
    expect(component.hub).toBe('TestHub');
  });

});
