import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../notices.service';
import { ApplicationSettings } from 'src/app/app.settings';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.css']
})
export class NoticeEditComponent implements OnInit {

  hub = 'MyHub';

  id = -1;
  detail: string;
  datePosted: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private appSettings: ApplicationSettings,
    private noticesService: NoticesService) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();

    this.id = this.route.snapshot.data.notice.identifier;
    this.detail = this.route.snapshot.data.notice.detail;
    this.datePosted = this.route.snapshot.data.notice.datePosted;
  }

  saveNotice(): void {
    this.logNoticeDetails('save');

    if (this.id === undefined || this.id === -1) {
      this.noticesService.createNotice(this.id, this.detail, this.datePosted);
    } else {
      this.noticesService.updateNotice(this.id, this.detail, this.datePosted);
    }

    this.router.navigate([this.hub, 'notices']);   // :hub/notices
  }

  deleteNotice(): void {
    this.logNoticeDetails('delete');

    const deleteConfirmed = confirm('Are you sure you want to delete this notice?');
    if (deleteConfirmed) {
      this.noticesService.deleteNotice(this.id);
      this.router.navigate(['/' + this.hub, 'notices']);
    }
  }

  cancelNotice(): void {
    this.router.navigate([this.hub, 'notices']);   // :hub/notices
  }

  logNoticeDetails(method: string): void {
    const noticeDetails = 'activity[id=' + this.id +
                      ', name=' + this.detail +
                      ', link=' + this.datePosted + ']';
    console.log('notice-edit.component: notice details [' + method + '] ' + noticeDetails);
  }
}
