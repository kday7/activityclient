import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplicationSettings } from 'src/app/app.settings';
import { PropertiesService } from '../properties.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    const settingsSpy = jasmine.createSpyObj('ApplicationSettings', ['getActiveHub']);
    const propertiesSpy = jasmine.createSpyObj('PropertiesService', ['getProperties']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ SettingsComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: 'activities' }}},
        {provide: ApplicationSettings, useValue: settingsSpy},
        {provide: PropertiesService, useValue: propertiesSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
