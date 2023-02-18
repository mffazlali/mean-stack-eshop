import { Component, OnInit } from '@angular/core'
import { UsersService } from '@eshop/users'

@Component({
    selector: 'ngshop-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private usersService: UsersService) {}

    ngOnInit() {
        this.usersService.initAppSession()
    }
}
