import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from './task';
import { TaskCategory } from './taskcategory';
import { TaskStatus } from './taskstatus';
import { ApplicationSettings } from '../../app.settings';
import { Project } from '../project-list/project';


@Component({
  selector: 'app-task',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  hub = 'MyHub';
  task: Task = new Task(-1, 'New Task', '', 'newTask', 'TASK', 'TODO', ''); 
  currentProject: Project;
  currentProjectId: number;
  destination: number;
  taskCategories: TaskCategory[] = [];
  taskStatuses: TaskStatus[] = [];
  allProjects: any[] = [];

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private appSettings: ApplicationSettings) {

    console.log('task.component: Current project ID: ' + this.route.snapshot.params.projectid);
    console.log('task.component: Task ID: ' + this.route.snapshot.params.taskid);

    console.log('task.component: Initialising task component');
    this.hub = this.appSettings.getActiveHub();

    this.currentProjectId = +this.route.snapshot.params.projectid;
    this.currentProject = this.route.snapshot.data.project;
    console.log('TaskComponent: Current project: ' + this.currentProject.name);
    this.task = this.route.snapshot.data.task;
    console.log('TaskComponent: Task: ' + this.task.name);

    // Get a list of project name/view pairs for populating the project drop down
    this.allProjects = this.route.snapshot.data.allProjects;
    this.destination = this.currentProjectId;

    this.taskCategories = TaskCategory.asArray();
    this.taskStatuses = TaskStatus.asArray();
  }

  ngOnInit() {
    console.log('TaskComponent: Initialising');
    // this.hub = this.appSettings.getActiveHub();
  }

  saveTask(): void {
    const taskDetails = 'task[identifier=' + this.task.identifier + ', parent=' + this.task.parent +
                      ', name=' + this.task.name + ', location=' + this.task.location +
                      ', view=' + this.task.view + ', category=' + this.task.category +
                      ', status=' + this.task.status + ']';
    console.log('task.component: saving task ' + taskDetails);

    if (this.task.identifier === undefined || this.task.identifier === -1) {
      this.createTask();

    } else if (this.destination !== this.currentProjectId) {
      this.updateTask(this.destination);

    } else {
      this.updateTask(0);
    }
  }

  private createTask(): void {
    console.log('task.component: creating task ' + this.task.identifier);
    this.taskService.createTask(this.currentProjectId, this.task);
    this.router.navigate(['/' + this.hub, 'projects']);
  }

  private updateTask(targetProject: number): void {
    this.taskService.updateTask(this.currentProjectId, targetProject, this.task);
    this.router.navigate(['/' + this.hub, 'projects', this.destination, 'tasks', this.task.identifier]);
  }

  deleteTask(): void {    
    this.logTaskDetails('delete');
    this.taskService.deleteTask(this.currentProjectId, this.task);
    this.router.navigate(['/' + this.hub, 'projects']);   
  }

  cancelEdit(): void {
    this.router.navigate([this.hub, 'projects']);
  }

  nameChanged(newName: string): void {
    console.log('task.component: new name: ' + newName);
    const nameWithoutInvalidChars: string = newName.replace(/ /gi, '').replace(/\./gi, '_');
    const newView: string = nameWithoutInvalidChars.slice(0, 1).toLowerCase() + nameWithoutInvalidChars.slice(1);
    console.log('task.component: modified name: ' + newView);

    this.task.view = newView;
    this.task.location = this.currentProject.view + '/' + newView;
  }

  targetChanged(newTarget: string): void {
    console.log('task.component: new target: ' + newTarget);

    // Find the project with an ID of newTarget in order to get the view
    let targetView: string;
    for (let i = 0; i < this.allProjects.length; i++) {
      if (+this.allProjects[i].identifier === +newTarget) {
        targetView = this.allProjects[i].view;
        break;
      }
    }

    this.task.location = this.sanitise(targetView) + '/' + this.sanitise(this.task.name);
  }

  sanitise(value: string): string {
    const valueWithoutInvalidChars: string = value.replace(/ /gi, '').replace(/\./gi, '_');
    return valueWithoutInvalidChars.slice(0, 1).toLowerCase() + valueWithoutInvalidChars.slice(1);
  }

  logTaskDetails(method: string): void {
    const taskDetails = 'task[identifier=' + this.task.identifier + ', parent=' + this.task.parent +
    ', name=' + this.task.name + ', location=' + this.task.location +
    ', view=' + this.task.view + ', category=' + this.task.category +
    ', status=' + this.task.status + ']';
    console.log('task.component: task details [' + method + '] ' + taskDetails);
  }
}
