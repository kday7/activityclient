export interface ITaskStatus {
  key: string;
  value: string;
}

export class TaskStatus implements ITaskStatus {
    static TODO = new TaskStatus('TODO', 'To Do');
    static COMPLETE = new TaskStatus('COMPLETE', 'Complete');
    static HOLD = new TaskStatus('HOLD', 'On Hold');
    static UNDEFINED = new TaskStatus('UNDEFINED', '');

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

    public static asArray(): TaskStatus[] {
      let allCategories: TaskStatus[] = [];
      allCategories.push(TaskStatus.TODO);
      allCategories.push(TaskStatus.COMPLETE);
      allCategories.push(TaskStatus.HOLD);
      allCategories.push(TaskStatus.UNDEFINED);
      return allCategories;
    }

    public static findByKey(key: string) : TaskStatus {
      //console.log('taskstatus: Searching for status ' + key);
      if (key === 'TODO') {
        return TaskStatus.TODO;
      }
      if (key === 'COMPLETE') {
        return TaskStatus.COMPLETE;
      }
      if (key === 'HOLD') {
        return TaskStatus.HOLD;
      }
      
      return TaskStatus.UNDEFINED;
    }
  }
