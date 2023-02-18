import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '@eshop/shared/environments'
import * as countriesLib from 'i18n-iso-countries'
import { LocalstorageService } from './localstorage.service'
import { UsersFacade } from '../state/users.facade'
import { User } from '../models/user'

declare const require: any

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(
        private http: HttpClient,
        private localstorageService: LocalstorageService,
        private usersFacade: UsersFacade
    ) {}
    apiURLUsers = `${environment.apiURL}/users`

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers)
    }

    getCountUsers() {
        return this.http.get<{ count: number }>(`${this.apiURLUsers}/get/count`)
    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`)
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user)
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user)
    }

    deleteUser(userId: string): Observable<User> {
        return this.http.delete<User>(`${this.apiURLUsers}/${userId}`)
    }

    getCountries() {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
        const countries = Object.entries(
            countriesLib.getNames('en', { select: 'official' })
        ).map((entry) => {
            return { id: entry[0], name: entry[1] }
        })
        return countries
    }

    initAppSession() {
        this.usersFacade.buildUserSession()
    }

    observeCurrentUser() {
        return this.usersFacade.currentUser$
    }

    isCurrentUserAuth() {
        return this.usersFacade.isAthenticated$
    }
}
