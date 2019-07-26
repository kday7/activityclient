import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { RouterModule } from '@angular/router';
import { NoticesResolver } from './notice-board/notices.resolver';
import { NoticeEditComponent } from './notice-edit/notice-edit.component';
import { NoticeResolver } from './notice-edit/notice.resolver';
import { FormsModule } from '@angular/forms';
import { NoticeDetailPipe } from './notice-board/notice-detail.pipe';

@NgModule({
  declarations: [
    NoticeBoardComponent,
    NoticeEditComponent,
    NoticeDetailPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':hub/notices', component: NoticeBoardComponent,
                resolve: {notices: NoticesResolver},
                runGuardsAndResolvers: 'always' },
      { path: ':hub/notices/:noticeid/edit', component: NoticeEditComponent,
                resolve: {notice: NoticeResolver},
                runGuardsAndResolvers: 'always' }
    ])
  ],
  exports: [
    NoticeBoardComponent
  ],
  providers: [
    NoticesResolver,
    NoticeResolver,
    DatePipe
  ]
})
export class NoticesModule { }
