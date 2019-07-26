import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NoticesService } from '../notices.service';
import { DatePipe } from '@angular/common';


@Injectable()
export class NoticeResolver implements Resolve<any> {

  notice: any;

  constructor(public noticesService: NoticesService, public datepipe: DatePipe) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('NoticeResolver: Notice id: ' + route.params.noticeid );

    this.getNotice(+route.params.noticeid);
    console.log('NoticeResolver: resolve finished');
    return this.notice;
  }

  getNotice(noticeId: number) {
      this.notice = undefined;
      console.log('NoticeResolver: Fetching ' + noticeId);

      if (noticeId === -1) {
        const datePosted = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
        this.notice = {'id': -1, 'detail': '', 'datePosted': datePosted};
      } else {
        this.notice = this.noticesService.getNotice(noticeId);
      }
      console.log('NoticeResolver: Call to getNotice has finished');
  }
}
