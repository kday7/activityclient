import { TaskCategory, ITaskCategory } from './taskcategory';
import { TaskStatus, ITaskStatus } from './taskstatus';

export class Task {

  parent: string;
  identifier: number;
  name: string;
  location: string;
  view: string;
  category: string;
  htmlContent: string;

  categoryEnum: ITaskCategory;
  status: ITaskStatus;

  constructor(id: number, name: string, location: string, view: string, category: string,
              statusCode: string, htmlContent: string) {
    this.identifier = id;
    this.name = name;
    this.location = location;
    this.view = view;
    this.category = category;
    this.categoryEnum = TaskCategory.findByKey(category);
    this.status = TaskStatus.findByKey(statusCode);
    this.htmlContent = htmlContent;
  }
}
