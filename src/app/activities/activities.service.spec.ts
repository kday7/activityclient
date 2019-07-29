import { TestBed, async } from '@angular/core/testing';

import { ActivitiesService } from './activities.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';
import { environment } from 'src/environments/environment';

describe('ActivitiesService', () => {
  let httpMock: HttpTestingController;
  let service: ActivitiesService;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', {
      'getActiveHub': 'TestHub'
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ApplicationSettings, useValue: settingsSpy}
      ]
    }).compileComponents();

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ActivitiesService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct endpoint', () => {
    expect(service.endpoint).toBe(`${environment.apiUrl}TestHub/`);
  });

  it('should return a list of activities', () => {
    const  someActivities = {_embedded: {activityResourceList: [
      { identifier:  1, name :  'Activity1' },
      { identifier:  2, name :  'Activity2' },
      { identifier:  3, name :  'Activity3' }
    ]}};

    service.getActivities().subscribe((activitiesList) => {
      expect(activitiesList.length).toBe(3);
    }); 

    const request = httpMock.expectOne(`${service.endpoint}Activities/`);
    expect(request.request.method).toBe('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(someActivities);
    httpMock.verify();
  });

  it('should return a single activity', () => {
    const activityResources =
      {
        identifier: 1, 
        name: 'Activity1', 
        url: "link", 
        icon: "icon.ico",
        _links: {
          self: "http://localhost:8181/ActivityHub/Activities/1"
        }
      };

    service.getActivity(1).subscribe((activity) => {
      expect(activity).toBe(activityResources);
    });

    const request = httpMock.expectOne(`${service.endpoint}Activities/1`);
    expect(request.request.method).toBe('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(activityResources);
    httpMock.verify();
  });

  it('should update the activity correctly', () => {
    service.updateActivity(7, 'test', 'link', 'icon.ico');

    const request = httpMock.expectOne(`${service.endpoint}Activities/7`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(`{"identifier":7,"name":"test","url":"link","icon":"icon.ico"}`);
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should create an activity', () => {
    service.createActivity(7, 'test', 'link', 'icon.ico');

    const request = httpMock.expectOne(`${service.endpoint}Activities/`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(`{"identifier":7,"name":"test","url":"link","icon":"icon.ico"}`);
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should delete an activity', () => {
    service.deleteActivity(7);

    const request = httpMock.expectOne(`${service.endpoint}Activities/7`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should open the activities file', () => {
    service.openActivitiesFile();

    const request = httpMock.expectOne(`${service.endpoint}Activities/open`);
    expect(request.request.method).toBe('POST');
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

});
