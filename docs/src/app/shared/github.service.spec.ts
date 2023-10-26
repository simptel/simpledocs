import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { BehaviorSubject } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  const repoUrl = new BehaviorSubject<string>('simptel/docs.simptel.com');
  let notify: BehaviorSubject<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClientTestingModule ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set docs refresh', done => {
    service.setDocsRefresh(true);
  });

  it('should get repo url', done => {
    service.getRepoUrl().subscribe(url => {
      done();
    });
  });

  it('should save repo url', () => {
    service.saveRepoUrl('simptel/docs.simptel.com');
  });

  it('should call show docs api', () => {
    const mockResponse = {
      docs: { 
        name: 'Get Started',
        type: 'dir'
      }
    };
    const repoName = 'simptel/docs.simptel.com';
    
    service.showDocsApi(repoName)
    .subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://api.github.com/repos/${repoName}/contents/docs`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    httpMock.verify();
  });

});
