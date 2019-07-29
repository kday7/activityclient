import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NoticesService } from '../notices.service';
import { Observable } from 'rxjs';

@Injectable()
export class NoticesResolver implements Resolve<any> {

  constructor(public noticesService: NoticesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.noticesService.getNotices();
  }
}
