import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public postUrl = `${environment.baseUrl}/api/posts`;
  constructor(private _http: HttpClient) {}

  getAllPost() {
    return this._http.get(this.postUrl);
  }
}
