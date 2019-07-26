import { TestBed, async } from '@angular/core/testing';
import { environment } from '../../environments/environment';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';

describe('TaskService', () => {
  let httpMock: HttpTestingController;
  let service: TaskService;

  const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    }).compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(TaskService);

    settingsSpy.getActiveHub.and.returnValue('TestHub');
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a task', () => {
    const  someTasks = [
      { identifier:  1, name :  'Task1' },
      { identifier:  2, name :  'Task2' },
      { identifier:  3, name :  'Task3' }
    ];

    service.getTask('1', '2').subscribe((fetchedTask) => {
      expect(fetchedTask.identifier).toBe(2);
    });

    const request = httpMock.expectOne(`${service.endpoint}Projects/1/Tasks/2`);
    expect(request.request.method).toBe('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(someTasks[1]);
    httpMock.verify();
  });

});
