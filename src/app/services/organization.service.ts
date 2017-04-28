import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Organization } from '../models/organization';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizationService {
  private headers: Headers;
  private organizationsUrl: string;

  constructor(private _http: Http, private config: AppConfig) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    this.organizationsUrl = this.config.getConfig('host') + '/v1/organizations';
  }

  // Get Organization details
  public getAll(): Observable<Organization[]> {
    return this._http
      .get(this.organizationsUrl, new RequestOptions({headers: this.headers}))
      .map((response) => response.json().data as Organization[]);
  }

  // Create an new organization
  public create(organization: Organization): Observable<Organization> {
    return this._http
      .get(this.organizationsUrl, new RequestOptions({headers: this.headers}))
      .map((response) => response.json() as Organization);
  }

  // Get details for the given organization ID
  public get(id: string): Observable<Organization> {
    return this._http
      .get(this.organizationsUrl + id, new RequestOptions({headers: this.headers}))
      .map((response) => response.json().result as Organization);
  }

  // Update existing org and password
  public update(organization: Organization): Observable<Organization> {
    return this._http.put(this.organizationsUrl + organization.id,
      JSON.stringify({organization}), new RequestOptions({headers: this.headers}))
      .map((response) => response.json() as Organization);
  }

  // Delete existing organization
  public delete(id: string) {
    return this._http
      .delete(this.organizationsUrl + id, new RequestOptions({headers: this.headers}));
  }

  // Get token from the localStorage
  private getToken(): string {
    return JSON.parse(localStorage.getItem('_tensor_user')).token;
  }
}