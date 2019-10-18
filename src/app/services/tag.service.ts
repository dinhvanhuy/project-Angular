import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tags } from '../models/tags';

@Injectable({
	providedIn: 'root'
})
export class TagService {
	// Sự kiện khi có tag được click để subcribe ở Articles List Component
	onClickedTag = new EventEmitter<string>();

	constructor(private httpClient: HttpClient) { }

	getTags(): Observable<Tags> {
		return this.httpClient.get<Tags>(`https://conduit.productionready.io/api/tags`);
	}
}
