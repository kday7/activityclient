import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from './task';
import { Observable, of } from 'rxjs';

@Injectable()
export class TaskResolver implements Resolve<Task> {

  constructor(public taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Task> {
    console.log('TaskResolver: Project id: ' + route.params.projectid );
    console.log('TaskResolver: Task id: ' + route.params.taskid );

    return this.getTask(route.params.projectid, route.params.taskid);
  }

  getTask(projectId: string, taskId: string) {
      console.log('TaskResolver: Fetching ' + projectId + '/' + taskId);

      if (taskId === '-1') {
        return of(new Task(-1, 'New Task', '', '', 'TASK', 'TODO', ''));
      } else {
        return this.taskService.getTask(projectId, taskId);
      }
  }
}
