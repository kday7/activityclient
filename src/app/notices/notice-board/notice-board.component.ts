import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from 'src/app/app.settings';
import { NoticesService } from '../notices.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit, DoCheck {

  hub: string;
  notices: any = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private appSettings: ApplicationSettings,
    private noticesService: NoticesService) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    // this.notices = this.route.snapshot.data.notices;
  }

  ngDoCheck() {
    this.notices = this.route.snapshot.data.notices;
  }

  deleteNotice(noticeId: number): void {
    const deleteConfirmed: boolean = confirm('Are you sure you want to delete notice number ' + noticeId + '?');
    if (deleteConfirmed) {
      this.noticesService.deleteNotice(noticeId);
      this.router.navigate(['/' + this.hub, 'notices']);
    }
  }
}
