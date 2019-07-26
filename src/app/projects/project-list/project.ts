
import { Task } from '../task-edit/task';

export class Project {

  identifier = -1;
  public name = '';
  view = '';
  group = 5;

  tasks: Task[];
 
  constructor(id: number, name: string, view: string, group: number) {
    this.identifier = id;
    this.name = name;
    this.view = view;
    this.group = group;
  }

}
