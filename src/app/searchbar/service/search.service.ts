import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchDto} from "../model/search-dto";
import {filter, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  search(phrase: string): Observable<Array<string>> {
    return this.http.get<SearchDto>('http://localhost:4200/assets/data.json')
      .pipe(
        map((dto: SearchDto) => {
          const phrases: Array<string> = dto.phrases;
          return phrases.filter((p: string) => p.toLowerCase().includes(phrase.toLowerCase()))
        })
      );
  }
}
