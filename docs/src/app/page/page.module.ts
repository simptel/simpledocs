import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class PageModule { }
