import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Activity Hub'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Activity Hub');
  });

  it(`should have a table with 2 rows`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(2);
  });

  it(`should have a table with 2 columns`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('tr')).queryAll(By.css('td')).length).toBe(2);
  });

  it(`should contain the sidebar`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(fixture.debugElement.query(By.css('td')).query(By.css('app-sidebar'))).toBeTruthy();
  });

  it('should render a status bar with text Ready...', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement; 
    expect(compiled.querySelector('p').textContent).toContain('Ready...');
  });

  // it('should disable the submit button when setting enabled to false', () => {
  //   import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
  //   import { Component, DebugElement } from "@angular/core";
  //   import { By } from "@angular/platform-browser";

  //   let component: AppComponent;
  //   let fixture: ComponentFixture<AppComponent>;
  //   let submitEl: DebugElement;

  //   fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.componentInstance;
  //   submitEl = fixture.debugElement.query(By.css('button'));
  //   component.enabled = false;
  //   fixture.detectChanges();
  //   expect(submitEl.nativeElement.disabled).toBeTruthy();
  // });
  
});
