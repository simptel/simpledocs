import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-repo',
  templateUrl: './input-repo.component.html',
  styleUrls: ['./input-repo.component.scss']
})
export class InputRepoComponent {
  repoUrl!: string;
  repo!: string;

  constructor(private sharedService: SharedService, private router: Router, 
    private route: ActivatedRoute) {
  }

  saveRepoUrl() {
    if (this.repoUrl) {
      this.repo = this.repoUrl.substring(19, this.repoUrl.length);
    }
    this.sharedService.saveRepoUrl(this.repo);
    this.sharedService.setDocsRefresh(true);
  }
}
