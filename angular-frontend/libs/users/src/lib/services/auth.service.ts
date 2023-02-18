import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '@eshop/shared/environments'
import { Observable } from 'rxjs'
// import { User } from '../models/user'
import { LocalstorageService } from './localstorage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private localStoreageService: LocalstorageService,
        private router: Router
    ) {}
    apiURLUsers = `${environment.apiURL}/users/login`

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.apiURLUsers, { email, password })
    }

    logout() {
        this.localStoreageService.removeToken()
        this.router.navigate(['/login'])
    }
}
