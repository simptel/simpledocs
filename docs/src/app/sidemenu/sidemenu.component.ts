import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GithubService } from '../shared/github.service';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  
  routes!: Route[];
  theme = 'light';
  repoName!: string;
  directories!: object;
  files!: object;
  showItems = -1;
  showInput = false;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private router: Router, 
    private githubService: GithubService, 
    private http: HttpClient
  ) {
    this.routes = [];
    this.getRoutes();
    this.getRepoUrl();
  }

  ngOnInit(): void {
    this.githubService.refreshDocs$.subscribe((res: boolean) => {
      if (res) {
        this.getRoutes();
        this.getRepoUrl();
      }
    })
  }

  toggleTheme(): void {
    if(localStorage.getItem('color-theme') == 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      this.theme = 'light';
    }
  }

  getRepoUrl() {
    this.githubService.getRepoUrl().subscribe((url: string) => {
      this.repoName = url;
    });
  }

  async toggleSubMenu(i: number, path:string) {
    if (this.showItems === i) {
      this.showItems = -1;
    } else {
      this.showItems = i;
    }
    this.getDirectoriesContent(path);
    path = path.replace(' ', '-').toLowerCase();
    this.router.navigateByUrl(path);
  }

  getDirectoriesContent(path: string) {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${path}`)
    .subscribe(res => {   
      this.files = res;   
    });
  }

  onChange(page: string) {
    this.router.navigateByUrl(page);
  }

  getRoutes() {
    this.getRepoUrl();
    this.githubService.showDocsApi(this.repoName)
    .subscribe((res: object) => {
      this.addRoutes(res);
    });  
  }

  addRoutes(res: object) {
    if (res instanceof Array) {
      res.forEach(item => {
        let path = '';
        if(item.name?.includes(' ')) {
          path = item.name.replace(' ', '-').toLocaleLowerCase(); 
        } else {
          path = item.name?.toLocaleLowerCase();
        }
        !this.routes?.find(route => route.path == path) && 
        this.routes.push({
          path: path,
          data: { label: item.name },
          component: PageComponent
        });
        this.router.resetConfig(this.routes);
      });
    }
  }
}
