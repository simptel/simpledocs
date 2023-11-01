import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { InputRepoComponent } from '../input-repo/input-repo.component';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../shared/github.service';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent, InputRepoComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [GithubService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load component on init if refreshDocs to be false', () => {
    component.ngOnInit();
    const mockRes = false;
    service.refreshDocs$.subscribe(res => {
      expect(res).toBe(mockRes);
    });
  });

  it('should load component on init if refreshDocs to be true', () => {
    component.ngOnInit();
    const mockRes = true;
    service.setDocsRefresh(true);
    service.refreshDocs$.subscribe(res => {
      expect(res).toBe(mockRes);
      component.getRepoUrl();
      component.showDocs();
    });
  });

  it('should get repo url', () => {
    service.getRepoUrl();
  });

  it('should show docs', () => {
    const mock = {
      name: 'Get Started',
      type: 'dir',
      download_url: 'https://raw.githubusercontent.com/simptel/docs.simptel.com/Getting Started/overview.md'
    };
    const repoName = 'simptel/docs.simptel.com';
    const pageName = 'Getting Started';

    const req = httpMock.expectOne(`https://api.github.com/repos/${repoName}/contents/docs/${pageName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });

  it('should save urls if dir', () => {
    const mock = {
      name: 'Get Started',
      type: 'dir'
    }
    component.saveDownloadUrls(mock);
  });

  it('should save urls if file', () => {
    const mock = {
      name: 'Get Started',
      type: 'file'
    }
    component.saveDownloadUrls(mock);
  });
  
  it('should show directory files', () => {
    const mock = {
      name: 'overview.md',
      type: 'file',
      download_url: 'https://raw.githubusercontent.com/simptel/docs.simptel.com/Getting Started/overview.md'
    };
    const repoName = 'simptel/docs.simptel.com';
    const pageName = 'Getting Started';
    
    component.showDirectoryFiles(mock);

    const req = httpMock.expectOne(`https://api.github.com/repos/${repoName}/contents/docs/${pageName}/${mock.name}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });

  it('should get download url', () => {
    const mock = {
      name: 'overview.md',
      downloadUrl: ''
    };
    const ext = mock.name.substring(mock.name.length-2, mock.name.length);
    component.getDownloadUrl(mock);
    expect(ext).toEqual('md');
  });
});
