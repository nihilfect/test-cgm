import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
  providers: [DatePipe]
})
export class RepoComponent {

  constructor(private http: HttpClient, private angularRouter: Router, private datePipe: DatePipe) { }

  @ViewChild("byName") byName!: ElementRef;
  @ViewChild("byLanguage") byLanguage!: ElementRef;
  @ViewChild("byStars") byStars!: ElementRef;
  @ViewChild("byIssue") byIssue!: ElementRef;

  viewIssues = false;

  searchResult: any[] = [];

  baseReposUrl = "https://api.github.com/search/repositories";
  baseIssuesUrl = "https://api.github.com/search/issues";

  togglePage() {
    this.viewIssues = !this.viewIssues;
    this.searchResult = [];
  }

  searchRepos() {
    let searchCriteria = "";
    let byNameValue = (this.byName.nativeElement as HTMLInputElement).value;
    let byLanguageValue = (this.byLanguage.nativeElement as HTMLInputElement).value;
    let byStarsValue = (this.byStars.nativeElement as HTMLInputElement).value;
    searchCriteria += `${byNameValue} in:full_name`;

    if (byLanguageValue && byLanguageValue != "") searchCriteria += ` ${byLanguageValue} in:language`;

    if (byStarsValue && byStarsValue != "") searchCriteria += ` ${+byStarsValue} in:score`; // Parse to Number

    this.doSearch(searchCriteria);
  }

  searchIssues() {
    let searchCriteria = "";
    let byIssueValue = (this.byIssue.nativeElement as HTMLInputElement).value;
    searchCriteria += `${byIssueValue} in:title`;

    this.doSearch(searchCriteria);
  }

  doSearch(searchCriteria: string) {
    let self = this;
    let baseUrl = this.viewIssues ? this.baseIssuesUrl : this.baseReposUrl;
    let urlString = baseUrl + "?q=" + encodeURIComponent(searchCriteria);
    console.log("Searching for:", urlString);
     // Uso di un rxJs operator per modificare la formattazione del campo created_at
    this.http.get(urlString).pipe(
      map((data: Partial<{
        items: any[]
      }>) => {
        data.items?.map(item => {
          item.translatedCreatedAt = self.datePipe.transform(item.created_at, 'M/d/yy, h:mm a'); 
        })
        return data;
      })
    ).subscribe({
      next: (data) => {
      if (data) this.searchResult = data.items!;
    }, error: err => alert(err.error.message)
  })
  }

  goToCommits(repoId: number) {
    this.angularRouter.navigate(["/commits"], {
      queryParams: {
        repo_id: repoId
      }
    });
  }
}
