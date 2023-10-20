import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private repoUrl: Subject<string> = new BehaviorSubject<string>('simptel/docs.simptel.com');
  public notify = new BehaviorSubject<boolean>(false);

  refreshDocs$ = this.notify.asObservable();
  
  public setDocsRefresh(data: boolean) {
    if (data) {
      this.notify.next(data);
    }
  }

  constructor(private http: HttpClient) { }

  getRepoUrl(){
    return this.repoUrl.asObservable();
  }

  saveRepoUrl(data:string) {
    this.repoUrl.next(data);
  }

  showDocsApi(repoName: string) {
    return this.http.get(`https://api.github.com/repos/${repoName}/contents/docs`);
  }
}
