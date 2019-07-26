export interface ITaskCategory {
  key: string;
  value: string;
}

export class TaskCategory implements ITaskCategory {
    static TASK = new TaskCategory('TASK', 'T');
    static NOTE = new TaskCategory('NOTE', 'N');
    static BUG = new TaskCategory('BUG', 'B');
    static UNDEFINED = new TaskCategory('UNDEFINED', '');

    // private to disallow creating other instances of this type
    private constructor(private _key: string, private _value: any) {
    }

    get value() {          // Getter only: don't allow value change
      return this._value;
    }

    get key() {
      return this._key;
    }

    toString() {
      return this._key;
    }

    public static asArray(): TaskCategory[] {
      let allCategories: TaskCategory[] = [];
      allCategories.push(TaskCategory.TASK);
      allCategories.push(TaskCategory.NOTE);
      allCategories.push(TaskCategory.BUG);
      allCategories.push(TaskCategory.UNDEFINED);
      return allCategories;
    }

    public static findByKey(key: string) : TaskCategory {
      //console.log('taskcategory: Searching for category ' + key);
      if (key === 'TASK') {
        return TaskCategory.TASK;
      }
      if (key === 'NOTE') {
        return TaskCategory.NOTE;
      }
      if (key === 'BUG') {
        return TaskCategory.BUG;
      }
      
      return TaskCategory.UNDEFINED;
    }
  }
