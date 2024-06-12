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
    this.pageName = this.router.url.replace('-', ' ').slice(1).split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}`)
    .subscribe({
      next: (res) => {
        Object.entries(res).forEach(([key, value], index) => {
          this.saveDownloadUrls(value);
        });
      },
      error: (error) => console.error(error),
      complete: () => console.log('Retrieved all the directories')
    });
  }

  saveDownloadUrls(item:any) {
    if (item.type == 'dir') {
      this.showDirectoryFiles(item);
    } else {
      const url = this.getDownloadUrl(item);
      if (!this.pageUrls.includes(url)) 
        this.pageUrls.push(url);
    }
  }

  showDirectoryFiles(item: any) {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}/${item.name}`)
    .subscribe({
      next: (res) => {
        Object.entries(res).forEach(([key, value], index) => {
          const url = this.getDownloadUrl(value);
          if (!this.directoryUrls.includes(url))
            this.directoryUrls.push(url);
        });
      }, 
      error: (error) => console.error(error),
      complete: () => console.log('Retrieved sub directory files')
    });
  }

  getDownloadUrl(item: any) {
    const ext = item.name?.substring(item.name.length-2, item.name.length);
    if (ext == 'md') {
      return item.download_url;
    }
  }
}
