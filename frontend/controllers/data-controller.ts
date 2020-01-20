import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataController {
  private http: HttpClient;
  private backendUrlPrefix: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.backendUrlPrefix = environment.production
      ? '/'
      : 'http://localhost:1338/';
  }

  getToDoItems(): Promise<{ name: string; isDone: boolean }[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.backendUrlPrefix + 'get').subscribe(
        (response: { name: string; isDone: boolean }[]) => resolve(response),
        error => reject(error)
      );
    });
  }
}
