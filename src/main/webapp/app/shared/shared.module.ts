import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskieSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TaskieSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TaskieSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskieSharedModule {
  static forRoot() {
    return {
      ngModule: TaskieSharedModule
    };
  }
}
