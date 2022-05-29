import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {mergeMap, Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {SearchService} from "../service/search.service";

@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.component.html',
  styleUrls: ['searchbar.component.css']
})
export class SearchbarComponent {
  phraseCtrl = new FormControl();
  filteredPhrases: Observable<Array<string>>;

  constructor(private searchService: SearchService) {
    this.filteredPhrases = this.phraseCtrl.valueChanges
      .pipe(
        startWith(''),
        mergeMap((searchPhrase: string) => this.searchService.search(searchPhrase))
      )
  }

  searchInGoogle(): void {
    const controlValue: string = this.phraseCtrl.value;
    window.open("https://www.google.pl/search?q=" + controlValue, '_blank');
  }
}
