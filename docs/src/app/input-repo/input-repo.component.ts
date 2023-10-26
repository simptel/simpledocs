import { Component } from '@angular/core';
import { GithubService } from '../shared/github.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-repo',
  templateUrl: './input-repo.component.html',
  styleUrls: ['./input-repo.component.scss']
})
export class InputRepoComponent {
  repoUrl!: string;

  constructor(private githubService: GithubService, private router: Router, 
    private route: ActivatedRoute) {
      this.repoUrl = 'https://github.com/simptel/docs.simptel.com';
  }

  saveRepoUrl() {
    if (this.repoUrl) {
      this.repoUrl = this.repoUrl.substring(19, this.repoUrl.length);
    }
    this.githubService.saveRepoUrl(this.repoUrl);
    this.githubService.setDocsRefresh(true);
  }
}
