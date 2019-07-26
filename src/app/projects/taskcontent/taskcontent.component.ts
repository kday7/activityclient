import { Component, OnInit } from '@angular/core';
import { Task } from '../task-edit/task';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taskcontent',
  template: '<div innerHTML="{{getTaskSnapshot().htmlContent}}"></div>',
  styleUrls: ['./taskcontent.component.css']
})
export class TaskContentComponent implements OnInit {

  // task: Task;

  constructor(public taskService: TaskService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.task = this.getTaskSnapshot();
  }

  public getTaskSnapshot(): Task {
    return this.route.snapshot.data.task;
  }
}
