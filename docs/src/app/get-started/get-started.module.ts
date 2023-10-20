import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GetStartedRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class GetStartedModule { }
