import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { TaskhubComponent } from './taskhub/taskhub.component';
import { ActivityhubComponent } from './activityhub/activityhub.component';
import { InfohubComponent } from './infohub/infohub.component';
import { SearchComponent } from './search/search/search.component';
import { ActivitysummaryComponent } from './activities/activitysummary/activitysummary.component';

import { ActivitiesResolver } from './activities/activitylist/activities.resolver';
import { SearchResolver } from './search/search/search.resolver';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'ActivityHub', component: ActivityhubComponent,
                         children: [
                          { path: '', redirectTo: 'daily-activities', pathMatch: 'full' },
                          { path: 'daily-activities', component: ActivitysummaryComponent,
                                  resolve: { activities: ActivitiesResolver },
                                  runGuardsAndResolvers: 'always' },
                          { path: 'search', component: SearchComponent,
                                  resolve: { searchResults: SearchResolver },
                                  runGuardsAndResolvers: 'always' }
                         ]
  },
  { path: 'TaskHub', component: TaskhubComponent },
  { path: 'InfoHub', component: InfohubComponent,
                     children: [
                      { path: '', redirectTo: 'daily-activities', pathMatch: 'full' },
                      { path: 'daily-activities', component: ActivitysummaryComponent,
                              resolve: { activities: ActivitiesResolver },
                              runGuardsAndResolvers: 'always' },
                      { path: 'search', component: SearchComponent,
                              resolve: { searchResults: SearchResolver },
                              runGuardsAndResolvers: 'always' }
                     ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
