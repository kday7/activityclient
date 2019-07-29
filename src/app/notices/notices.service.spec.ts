import { TestBed, async } from '@angular/core/testing';

import { NoticesService } from './notices.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationSettings } from '../app.settings';
import { environment } from 'src/environments/environment';

describe('NoticesService', () => {

  let httpMock: HttpTestingController;
  let service: NoticesService;

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
    service = TestBed.get(NoticesService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct endpoint', () => {
    expect(service.endpoint).toBe(`${environment.apiUrl}TestHub/`);
  });

  it('should return a list of notices', () => {
    const someNotices = {_embedded: {noticeResourceList: [
      { identifier:  1, detail :  'Notice1', datePosted : '' },
      { identifier:  2, detail :  'Notice2', datePosted : '' },
      { identifier:  3, detail :  'Notice3', datePosted : '' }
    ]}};

    service.getNotices().subscribe((ntoicesList) => {
      expect(ntoicesList.length).toBe(3);
    }); 

    const request = httpMock.expectOne(`${service.endpoint}Notices/`);
    expect(request.request.method).toBe('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(someNotices);
    httpMock.verify();
  });

  it('should return a single notice', () => {
    const noticeResources =
      {
        identifier: 1, 
        detail: "Notice 1", 
        datePosted: "",
        _links: {
          self: "http://localhost:8181/ActivityHub/Notices/1"
        }
      };

    service.getNotice(1).subscribe((notice) => {
      expect(notice).toBe(noticeResources);
    });

    const request = httpMock.expectOne(`${service.endpoint}Notices/1`);
    expect(request.request.method).toBe('GET');
    expect(request.request.responseType).toEqual('json');
    request.flush(noticeResources);
    httpMock.verify();
  });

  it('should update the notice correctly', () => {
    service.updateNotice(7, 'test', '01/01/2019');

    const request = httpMock.expectOne(`${service.endpoint}Notices/7`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(`{"identifier":7,"detail":"test","datePosted":"01/01/2019"}`);
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should create a notice', () => {
    service.createNotice(7, 'test', '01/01/2019');

    const request = httpMock.expectOne(`${service.endpoint}Notices/`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(`{"identifier":7,"detail":"test","datePosted":"01/01/2019"}`);
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should delete a notice', () => {
    service.deleteNotice(7);

    const request = httpMock.expectOne(`${service.endpoint}Notices/7`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

  it('should open the notices file', () => {
    service.openNoticesFile();

    const request = httpMock.expectOne(`${service.endpoint}Notices/open`);
    expect(request.request.method).toBe('POST');
    expect(request.request.responseType).toEqual('json');
    httpMock.verify();
  });

});
