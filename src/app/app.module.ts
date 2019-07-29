import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ProjectsModule } from './projects/projects.module';
import { SettingsModule } from './settings/settings.module';
import { ActivitiesModule } from './activities/activities.module';
import { SearchModule } from './search/search.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TaskhubComponent } from './taskhub/taskhub.component';
import { ActivityhubComponent } from './activityhub/activityhub.component';
import { InfohubComponent } from './infohub/infohub.component';
import { SidebarsModule } from './sidebars/sidebars.module';
import { NoticesModule } from './notices/notices.module';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { LogResponseInterceptor } from './interceptors/log-response.interceptor';
import { SearchCacheInterceptor } from './interceptors/search-cache.interceptor';
import { SearchResultsCache } from './search/search-results.cache';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TaskhubComponent,
    ActivityhubComponent,
    InfohubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarsModule,
    ActivitiesModule,
    ProjectsModule,
    SettingsModule,
    SearchModule,
    NoticesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/activity-client/' },
    SearchResultsCache,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: SearchCacheInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
