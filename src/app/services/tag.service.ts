import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tags } from '../models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getTags(): Observable<Tags> {
    return this.httpClient.get<Tags>(`https://conduit.productionready.io/api/tags`);
  }
}
