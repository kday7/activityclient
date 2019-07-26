import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activitylist/activity-list.component';
import { ActivityEditComponent } from './activityedit/activity-edit.component';
import { ActivitiesResolver } from './activitylist/activities.resolver';
import { ActivityResolver } from './activityedit/activity.resolver';
import { RouterModule } from '@angular/router';
import { ActivitysummaryComponent } from './activitysummary/activitysummary.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActivityListComponent,
    ActivityEditComponent,
    ActivitysummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':hub/activities', component: ActivityListComponent,
                                          resolve: { activities: ActivitiesResolver },
                                          runGuardsAndResolvers: 'always' },
      { path: ':hub/activities/:activity/edit', component: ActivityEditComponent,
                                                  resolve: { activity: ActivityResolver },
                                                  runGuardsAndResolvers: 'always' }

    ])
  ],
  exports: [
    ActivitysummaryComponent
  ],
  providers: [
    ActivityResolver,
    ActivitiesResolver
  ]
})
export class ActivitiesModule { }
