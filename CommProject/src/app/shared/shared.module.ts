import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SpinerComponent, LoadingComponent } from './loading'

@NgModule({
    imports: [CommonModule],
    exports: [TranslateModule, LoadingComponent],
    declarations: [
      LoadingComponent,
      SpinerComponent
    ],
})

export class SharedModule {}