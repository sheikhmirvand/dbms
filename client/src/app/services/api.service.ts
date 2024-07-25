import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConnectionInfo, IGetDatabases, ITable } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  connectDb({ password, port, user }: IConnectionInfo) {
    return this.http.post(
      `${this.BASE_URL}/db`,
      { password, port, user },
      { observe: 'response' }
    );
  }

  getDatabases(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/db/`);
  }

  getDatabase(name: string): Observable<ITable[]> {
    return this.http.get<ITable[]>(`${this.BASE_URL}/db/${name}`);
  }

  queryToDb(query: string, name: string) {
    return this.http.post(
      `${this.BASE_URL}/db/${name}/query/`,
      { query },
      { observe: 'response' }
    );
  }

  getTable(db: string, table: string) {
    return this.http.get(`${this.BASE_URL}/db/${db}/${table}`, {
      observe: 'response',
    });
  }

  deletTable(table: string) {
    return this.http.delete(`${this.BASE_URL}/db/${table}`, {
      observe: 'response',
    });
  }
}
