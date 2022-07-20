import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommitInterface } from '../interfaces/commit.interface';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  commitsResult: Partial<CommitInterface>[] = [];

  paramsObs!: Subscription;

  ngOnInit(): void {
    this.paramsObs = this.activatedRoute.queryParams.subscribe((qP: Partial<{
      repo_id: string
     }>) => {
      if(qP.repo_id) this.searchCommits(+qP.repo_id);
    });
  }

  ngOnDestroy(): void {
    this.paramsObs.unsubscribe();
  }

  searchCommits(repositoryId: number) {
    let searchCommitsEndpoint = `https://api.github.com/repositories/${repositoryId}/commits`;
    console.log("Searching for: ", searchCommitsEndpoint);
    this.http.get(searchCommitsEndpoint).subscribe({
      next: (res: any) => this.commitsResult = res,
      error: err => alert(err.error.message)
    }
  );
  }

}
