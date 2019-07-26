import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContentComponent } from './taskcontent.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';

describe('TaskContentComponent', () => {
  let component: TaskContentComponent;
  let fixture: ComponentFixture<TaskContentComponent>;

  beforeEach(async(() => {
    const tasksSpy = jasmine.createSpyObj('TaskService', ['getTasks']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TaskContentComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: { data: {task: {id: 1, name: 'Test', htmlContent: '<p>Test content</p>'} }}}},
        {provide: TaskService, useValue: tasksSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the content', () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const p = componentElement.querySelector('p');
    expect(p.textContent).toEqual('Test content');
  });

});
