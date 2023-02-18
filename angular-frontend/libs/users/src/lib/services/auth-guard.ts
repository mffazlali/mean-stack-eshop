import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { LocalstorageService } from './localstorage.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private localstorageService: LocalstorageService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        const token = this.localstorageService.getToken()
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]))
            if (tokenDecode.isAdmin && !this._dateExpired(tokenDecode.exp))
                return true
        }
        this.router.navigateByUrl('/login')
        return false
    }

    private _dateExpired(expiration): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration
    }
}
