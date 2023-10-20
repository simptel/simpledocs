import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputRepoComponent } from './input-repo/input-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    GetStartedComponent,
    SidemenuComponent,
    InputRepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
