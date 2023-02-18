import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { LocalstorageService } from '../../services/localstorage.service'

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup
    isSubmitted = false
    authError = false
    authMessage = 'Email or Password are wrong'

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private localstorageService: LocalstorageService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this._initLoginForm()
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }

    get loginForm() {
        return this.loginFormGroup.controls
    }

    onSubmit() {
        this.isSubmitted = true
        if (this.loginFormGroup.invalid) {
            return
        }

        this.authService
            .login(
                this.loginForm['email'].value,
                this.loginForm['password'].value
            )
            .subscribe({
                next: (result) => {
                    this.authError = false
                    this.localstorageService.setToken(result.token)
                    this.router.navigateByUrl('/')
                },
                error: (error: HttpErrorResponse) => {
                    this.authError = true
                    if (error.status !== 400) {
                        this.authMessage =
                            'Error in the Server, please try again leter!'
                    }
                },
            })
    }
}
