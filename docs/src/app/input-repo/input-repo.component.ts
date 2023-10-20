import { Component } from '@angular/core';
import { SharedService } from '../shared/github.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-repo',
  templateUrl: './input-repo.component.html',
  styleUrls: ['./input-repo.component.scss']
})
export class InputRepoComponent {
  repoUrl!: string;

  constructor(private sharedService: SharedService, private router: Router, 
    private route: ActivatedRoute) {
      this.repoUrl = 'https://github.com/simptel/docs.simptel.com';
  }

  saveRepoUrl() {
    if (this.repoUrl) {
      this.repoUrl = this.repoUrl.substring(19, this.repoUrl.length);
    }
    this.sharedService.saveRepoUrl(this.repoUrl);
    this.sharedService.setDocsRefresh(true);
  }
}
