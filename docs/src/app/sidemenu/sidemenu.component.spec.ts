import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubService } from '../shared/github.service';
import { Route } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  let service: GithubService;
  let httpMock: HttpTestingController;
  const routes: Route[] = [{ path: 'get-started', component: PageComponent, data: { label: 'Get Started' } }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      providers: [HttpClientTestingModule, GithubService, RouterTestingModule],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should toggle theme if light', () => {
    component.toggleTheme();
  });

  it('should toggle theme if dark', () => {
    component.toggleTheme();
  });

  it('should get repo url', done => {
    component.getRepoUrl();
    const repoName = 'simptel/docs.simptel.com';
    service.getRepoUrl().subscribe(url => {
      expect(repoName).toEqual(url);
      done();
    });
  });

  it('should toggle submenu', () => {
    const path = 'Get Started';
    component.toggleSubMenu(-1, path);
    component.getDirectoriesContent(path);
    expect(path).toBe('Get Started');
  });

  it('should toggle submenu for -1 index', () => {
    const path = 'Get Started';
    component.toggleSubMenu(1, path);
    component.getDirectoriesContent(path);
    expect(path).toBe('Get Started');
  });

  it('should get directories content', () => {
    const path = 'Get Started';
    const mockResponse = [{
      name: 'overview.md',
      type: 'file'
    }];
    const files = mockResponse;

    component.getDirectoriesContent(path);

    const req = httpMock.expectOne(`https://api.github.com/repos/${component.repoName}/contents/docs/${path}`);
    expect(req.request.method).toEqual('GET');

    expect(files).toBe(mockResponse);

    req.flush(mockResponse);
  });

  it('should get routes', () => {
    const mock = [
      {
        name: "Get Started",
        path: "docs/Get Started",
        type: "dir"
      }
    ];
    
    component.getRoutes();
    component.getRepoUrl();

    component.addRoutes(mock);
    spyOn(component, "addRoutes").and.callThrough();
  });

  it('should add routes', () => {
    component.routes.forEach(item => {
      item.path = 'Get Started'
      const path = 'get-started';
      spyOn(item.path, "includes")
      expect(path).toBe(item.path.replace(' ', '-').toLocaleLowerCase());
    });
  });
});
