import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, take, takeUntil } from 'rxjs'
import { CartService } from '../../services/cart.service'
import { OrdersService } from '../../services/orders.service'

@Component({
    selector: 'orders-order-summery',
    templateUrl: './order-summary.component.html',
    styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    totalPrice = 0
    endsubs: Subject<any> = new Subject()
    isCheckout: boolean

    constructor(
        private cartService: CartService,
        private ordersService: OrdersService,
        private router: Router
    ) {
        this.isCheckout = router.url.includes('checkout')
    }

    ngOnInit() {
        this._getOrdersSummary()
    }

    ngOnDestroy() {
        this.endsubs.next(null)
        this.endsubs.complete()
    }

    private _getOrdersSummary() {
        this.cartService.cart$
            .pipe(takeUntil(this.endsubs))
            .subscribe((cart) => {
                this.totalPrice = 0
                if (cart) {
                    cart.items.forEach((item) => {
                        this.ordersService
                            .getProduct(item.productId)
                            .pipe(take(1))
                            .subscribe((product) => {
                                this.totalPrice += product.price * item.quantity
                            })
                    })
                }
            })
    }

    navigateToCheckout() {
        this.router.navigate(['/checkout'])
    }
}
