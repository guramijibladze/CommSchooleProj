import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SpinerComponent, LoadingComponent } from './loading'
import { MustMatchDirective } from './directives/must-match.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TranslateModule, LoadingComponent,  MustMatchDirective],
    declarations: [
      LoadingComponent,
      SpinerComponent,
      MustMatchDirective
    ],
})

export class SharedModule {}