import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notice } from './notice-board/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

  constructor(private http: HttpClient,
              private appSettings: ApplicationSettings) { }

  private extractData(data: any): Notice[] {
    console.log('===> Notices Service returned data of type ' + typeof(data));
    const extractedNotices: Notice[] = [];
    this.convertNotices(extractedNotices, (data._embedded === undefined) ? {} : data._embedded.noticeResourceList);

    return extractedNotices;
  }

  private convertNotices(notices: Notice[], sourceData: any): void {
    let rawNotices: Notice[] = [];
    for (const i in sourceData) {
      if (sourceData[i] !== undefined) {
        const notice: Notice = new Notice();
        Object.assign(notice, sourceData[i]);

        rawNotices[i] = notice;
      }
    }

    // Sort the notices by date
    rawNotices = rawNotices.sort(this.sortNotices);
    rawNotices.forEach(element => {
      notices[notices.length] = element;
    });
  }

  private sortNotices(noticeA: Notice, noticeB: Notice) {
    var datePattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var dateA = new Date(noticeA.datePosted.replace(datePattern,'$3-$2-$1'));
    var dateB = new Date(noticeB.datePosted.replace(datePattern,'$3-$2-$1'));

    return dateA > dateB ? -1 : 1;
  }

  getNotices(): Observable<any> {
    return this.http.get(this.endpoint + 'Notices/').pipe(
      // tap(data => console.log('Output from getNotices()' + JSON.stringify(data))),
      map(data => this.extractData(data))
    );
  }

  updateNotice(id: number, detail: string, datePosted: string): void {
    console.log('notices.service (updateNotice): updating notice ' + id);

    const editUrl = this.endpoint + 'Notices/' + id;
    console.log('Update URL: ' + editUrl);

    const noticeAsJson: string = JSON.stringify(
      {'identifier': id, 'detail': detail, 'datePosted': datePosted},
      ['identifier', 'detail', 'datePosted']);
    console.log('notices.service: JSON representation = ' + noticeAsJson);

    this.http.put(editUrl, noticeAsJson).subscribe(res => console.log(res));
  }

  createNotice(id: number, detail: string, datePosted: string) {
    console.log('notices.service: creating notice ' + id);

    const createUrl: string = this.endpoint + 'Notices/';
    console.log('notices.service: Create URL: ' + createUrl);

    const noticeAsJson: string = JSON.stringify(
      {'identifier': id, 'detail': detail, 'datePosted': datePosted},
      ['identifier', 'detail', 'datePosted']);
    console.log('notices.service: JSON representation = ' + noticeAsJson);

    this.http.post(createUrl, noticeAsJson).subscribe(res => console.log(res));
  }

  deleteNotice(id: number) {
    console.log('notices.service (deleteNotice): deleting notice ' + id);

    const deleteUrl = this.endpoint + 'Notices/' + id;
    console.log('Delete URL: ' + deleteUrl);

    this.http.delete(deleteUrl).subscribe(res => console.log(res));
  }

  getNotice(id: number): Observable<any> {
    console.log('notices.service: Fetching ' + id);

    const fetchUrl = this.endpoint + 'Notices/' + id;
    console.log('Fetch URL: ' + fetchUrl);

    return this.http.get(fetchUrl);
  }

  openNoticesFile(): void {
    console.log('notices.service: Opening file');

    const openUrl = this.endpoint + 'Notices/open';
    console.log('Open URL: ' + openUrl);

    this.http.post(openUrl, null).subscribe(res => console.log(res));
  }

}
