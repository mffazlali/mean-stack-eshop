import { Component } from '@angular/core'
import { CartService } from '@eshop/orders'

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private cartService: CartService) {
        cartService.initCartLocalstorage()
    }
}
