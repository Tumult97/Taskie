import { NgModule } from '@angular/core';

import { TaskieSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [TaskieSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [TaskieSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TaskieSharedCommonModule {}
