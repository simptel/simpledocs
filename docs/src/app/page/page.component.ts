import { Component, OnInit } from '@angular/core';
import { GithubService } from '../shared/github.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  repoName!: string;
  pageUrls!: string[];
  directoryUrls!: string[];
  pageName!: string;
  url!: string;
  routes!: Route[];
  updateDocs = false;

  constructor(
    private githubService: GithubService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {
    this.directoryUrls = [];
    this.pageUrls = [];
    this.getRepoUrl();
    this.showDocs();
  }

  ngOnInit(): void {
    this.githubService.refreshDocs$.subscribe((res:boolean) => {
      if (res) {
        this.getRepoUrl();
        this.showDocs();
      }
    })
  }

  getRepoUrl() {
    this.githubService.getRepoUrl().subscribe((url:string) => {
      this.repoName = url;
    });
  }

  showDocs() {
    this.pageUrls = [];
    this.pageName = this.route.snapshot.data['label'] || 'Getting Started';
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}`)
    .subscribe(res => {      
      if (res instanceof Array) {
        res.forEach(item => {
          if (item.type == 'dir') {
            this.showDirectoryFiles(item);
          } else if (item.type == 'file') {
            const url = this.getDownloadUrl(item);
            !this.pageUrls.includes(url) && 
            this.pageUrls.push(url);
          }
        });
      }
    });
  }

  showDirectoryFiles(item: any) {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}/${item.name}`)
    .subscribe(res => {
      if (res instanceof Array) {
        res.forEach(file => {
          const url = this.getDownloadUrl(file);
          !this.directoryUrls.includes(url) && 
          this.directoryUrls.push(url);
        });
      }
    });
  }

  getDownloadUrl(item: any) {
    const ext = item.name.substring(item.name.length-2, item.name.length);
    if (ext == 'md') {
      return item.download_url;
    }
  }
}
