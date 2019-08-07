import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Moment;
  complete?: boolean;
  category?: string;
  user?: IUser;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public dueDate?: Moment,
    public complete?: boolean,
    public category?: string,
    public user?: IUser
  ) {
    this.complete = this.complete || false;
  }
}
