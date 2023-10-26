import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRepoComponent } from './input-repo.component';
import { GithubService } from '../shared/github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('InputRepoComponent', () => {
  let component: InputRepoComponent;
  let fixture: ComponentFixture<InputRepoComponent>;
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputRepoComponent],
      providers: [GithubService, HttpClientTestingModule],
      imports: [HttpClientTestingModule, FormsModule]
    });
    service = TestBed.inject(GithubService);
    fixture = TestBed.createComponent(InputRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save repo url', () => {
    let repoUrl = 'https://github.com/simptel/docs.simptel.com';
    const saveRepoSpy = spyOn(service, "saveRepoUrl");
    const docsRefreshSpy = spyOn(service, "setDocsRefresh");

    spyOn(component, 'saveRepoUrl').and.callThrough();
    component.saveRepoUrl();

    repoUrl = repoUrl.substring(19, repoUrl.length);
    expect(saveRepoSpy).toHaveBeenCalledWith(repoUrl);
    expect(docsRefreshSpy).toHaveBeenCalledWith(true);
  });
});
