import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent {

  constructor(private http: HttpClient, private angularRouter: Router) { }

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
    let baseUrl = this.viewIssues ? this.baseIssuesUrl : this.baseReposUrl;
    let urlString = baseUrl + "?q=" + encodeURIComponent(searchCriteria);
    console.log("Searching for:", urlString);
    this.http.get(urlString).subscribe((data: Partial<{
      items: any[]
    }>) => {
      if (data) this.searchResult = data.items!;
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
