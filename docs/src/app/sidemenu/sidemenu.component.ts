import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GithubService } from '../shared/github.service';
import { PageComponent } from '../page/page.component';

import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';

interface NestedMenu {
  name: string;
  children?: NestedMenu[];
}

let MENU_DATA: NestedMenu[] = [];

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  
  routes!: Route[];
  docs = {};
  theme = 'light';
  repoName!: string;
  directories!: object;
  files!: object;
  showItems = -1;
  showInput = false;

  treeControl = new NestedTreeControl<NestedMenu>(node => node.children);
  dataSource = new ArrayDataSource(MENU_DATA);

  hasChild = (_: number, node: NestedMenu) => !!node.children && node.children.length > 0;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private router: Router, 
    private githubService: GithubService, 
    private http: HttpClient
  ) {
    this.routes = [];
    this.getRoutes();
    localStorage.setItem('color-theme', this.theme);
  }

  ngOnInit(): void {
    this.githubService.refreshDocs$.subscribe((res: boolean) => {
      if (res) {
        this.getRoutes();
      }
    });
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

  async toggleSubMenu(route: string, node: NestedMenu) {
    route = route.replace(' ', '-').toLowerCase();
    this.router.navigateByUrl(route);
    this.treeControl.expand(node);
  }

  getRoutes() {
    this.getRepoUrl();
    this.githubService.showDocsApi(this.repoName)
    .subscribe((res: object) => {
      this.addRoutes(res);
      this.nestedMenuItems(res);
    });  
  }

  nestedMenuItems(docs: object) {
    MENU_DATA = [];
    
    docs instanceof Array &&
    docs.forEach(doc => {
      const menuItem: NestedMenu = { name: '', children: [] };
      const children = this.getMenuItemChildren(doc.name);
      menuItem.name = doc.name;
      menuItem.children = children;

      MENU_DATA.push(menuItem);
    });

    this.dataSource = new ArrayDataSource(MENU_DATA);
  }

  getMenuItemChildren(directoryName: string) {
    const menuItem: NestedMenu = { name: '', children: [] };
    
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${directoryName}`)
    .subscribe(response => {   
      response instanceof Array &&
      response.forEach(item => {
        menuItem.children = this.handleDir(directoryName, item, menuItem);
      });
    });
    return menuItem.children;
  }

  handleDir(directoryName:string, item:any, menuItem: any) {
    if (item.type === 'dir') {
      const obj = this.handleSubMenuItems(directoryName, item.name);
      menuItem.children?.push(obj);
    } else {
      menuItem.children?.push({ name: item.name });
    }
    return menuItem.children;
  }

  handleSubMenuItems(directoryName: string, subDirectoryName: string) {
    const menuItem: NestedMenu = {
      name: subDirectoryName,
      children: []
    };
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${directoryName}/${subDirectoryName}`)
    .subscribe(res => {
      res instanceof Array &&
      res.forEach(item => {
        menuItem.children?.push({ name: item.name })
      });
    })
    return menuItem;
  }

  addRoutes(routes: object) {
    if (routes instanceof Array) {
      routes.forEach(item => {
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
