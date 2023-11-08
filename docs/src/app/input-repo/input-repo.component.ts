import { Component } from '@angular/core';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-input-repo',
  templateUrl: './input-repo.component.html',
  styleUrls: ['./input-repo.component.scss']
})
export class InputRepoComponent {
  repoUrl!: string;

  constructor(private githubService: GithubService) {
    githubService.getRepoUrl().subscribe(url => {
      this.repoUrl = 'https://github.com/' + url;
    });
  }

  saveRepoUrl() {
    this.repoUrl = this.repoUrl.substring(19, this.repoUrl.length);
    this.githubService.saveRepoUrl(this.repoUrl);
    this.githubService.setDocsRefresh(true);
  }
}
