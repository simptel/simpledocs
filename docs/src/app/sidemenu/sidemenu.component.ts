import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/github.service';
import { PageComponent } from '../get-started/get-started.component';

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

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private router: Router, 
    private sharedService: SharedService, 
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.routes = [];
    this.getRoutes();
    this.getMenuItems();
  }

  ngOnInit(): void {
    this.sharedService.refreshDocs$.subscribe(res => {
      if (res) {
        this.getRoutes();
        this.getMenuItems();
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
    this.sharedService.getRepoUrl().subscribe(url => {
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

  getMenuItems() {
    this.getRepoUrl();
    this.sharedService.showDocsApi(this.repoName).subscribe(res => {
      this.directories = res;
    });
  }

  getRoutes() {
    this.getRepoUrl();
    this.sharedService.showDocsApi(this.repoName)
    .subscribe(res => {
      this.addRoutes(res);
    });  
  }

  addRoutes(res: object) {
    if (res instanceof Array) {
      res.forEach(item => {
        const path = item.name.includes(' ') 
          ? item.name.replace(' ', '-').toLocaleLowerCase() 
          : item.name.toLocaleLowerCase();
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
