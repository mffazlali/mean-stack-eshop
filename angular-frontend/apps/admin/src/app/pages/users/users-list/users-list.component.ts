import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User, UsersService } from '@eshop/users'
import { MessageService, ConfirmationService } from 'primeng/api'
import * as countriesLib from 'i18n-iso-countries'
import { Subject, takeUntil } from 'rxjs'

declare const require: any

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: [],
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: User[] = []
    endsubs$: Subject<any> = new Subject()

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this._getUsers()
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    deleteUser(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            accept: () => {
                this.usersService
                    .deleteUser(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        next: () => {
                            this._getUsers()
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'User is deleted!',
                            })
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'User is not deleted!',
                            })
                        },
                    })
            },
        })
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`)
    }

    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.users = cats
            })
    }

    public getCountryName(countryId: string) {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
        return countriesLib.getName(countryId, 'en')
    }
}
