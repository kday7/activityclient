import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { RouterModule } from '@angular/router';
import { PropertiesResolver } from './settings/properties.resolver';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':hub/settings', component: SettingsComponent,
                           resolve: { properties: PropertiesResolver },
                           runGuardsAndResolvers: 'always' }

    ])
  ],
  exports: [
    SettingsComponent
  ],
  providers: [
    PropertiesResolver
  ]
})
export class SettingsModule { }
