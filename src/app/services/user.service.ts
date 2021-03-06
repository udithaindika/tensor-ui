import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from '../models/user';
import { AuthenticationService } from '../services';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = '/users';
    private userUrl = '/users';

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    public getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    // Create an new user
    // To update the password use updatePassword method
    public addUser(user: User): Promise<User> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getUser(): Promise<User> {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    // Update user password
    public updatePassword(userId: number, pwd: string) {
        const url = this.usersUrl + '/' + userId + '/password';
        const body = JSON.stringify({password: pwd});

        return this.http.post(url, body, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).toPromise().catch(this.handleError);
    }

    // Update existing user and password
    public updateUser(user: User) {
        const url = this.usersUrl + '/' + user.id;

        return this.http.put(url, JSON.stringify({user}), {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        })
            .toPromise()
            .catch(this.handleError);
    }

    // Delete existing user
    public deleteUser(userId: number) {
        const url = this.usersUrl + '/' + userId;

        return this.http.delete(url)
            .toPromise()
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}
