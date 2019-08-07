import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { AccountService } from 'app/core';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: ITask[];
  currentAccount: any;
  eventSubscriber: Subscription;
  search = '';
  tempTasks: Array<ITask>;
  tempTasks2: Array<ITask>;

  constructor(
    protected taskService: TaskService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.taskService
      .query()
      .pipe(
        filter((res: HttpResponse<ITask[]>) => res.ok),
        map((res: HttpResponse<ITask[]>) => res.body)
      )
      .subscribe(
        (res: ITask[]) => {
          this.tasks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTasks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITask) {
    return item.id;
  }

  registerChangeInTasks() {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  updateSearch() {
    this.taskService
      .query()
      .pipe(
        filter((res: HttpResponse<ITask[]>) => res.ok),
        map((res: HttpResponse<ITask[]>) => res.body)
      )
      .subscribe(
        (res: ITask[]) => {
          this.tasks = new Array<ITask>();
          this.tempTasks = res;
          if (this.search === '') {
            this.tasks = res;
          } else {
            this.tempTasks.forEach(task => {
              if (
                task.user.firstName.toLowerCase().indexOf(this.search) >= 0 ||
                task.user.lastName.toLowerCase().indexOf(this.search) >= 0 ||
                task.title.toLowerCase().indexOf(this.search) >= 0 ||
                task.description.toLowerCase().indexOf(this.search) >= 0 ||
                task.category.toLowerCase().indexOf(this.search) >= 0
              ) {
                this.tasks.push(task);
              }
            });
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
}
