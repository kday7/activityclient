import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'noticeDetailDisplay'})
export class NoticeDetailPipe implements PipeTransform {
  transform(value: string): string {
    let newDetail = '';
    newDetail = value.replace('\r\n', ' <br/> ');
    return newDetail;
  }
}
