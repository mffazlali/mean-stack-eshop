import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { CartItem, CartItemDetailed } from '../../models/cart'
import { CartService } from '../../services/cart.service'
import { OrdersService } from '../../services/orders.service'

@Component({
    selector: 'orders-cart-page-cart-page',
    templateUrl: './cart-page.component.html',
    styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
    quantity: number
    cartItemsDetailed: CartItemDetailed[] = []
    cartCount = 0
    endsubs$: Subject<any> = new Subject()

    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    ngOnInit() {
        this._getCartDetails()
    }

    private _getCartDetails() {
        this.cartService.cart$
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cart) => {
                this.cartItemsDetailed = []
                this.cartCount = cart.items?.length ?? 0
                cart.items.forEach((cardItem) => {
                    this.ordersService
                        .getProduct(cardItem.productId)
                        .subscribe((resProduct) => {
                            this.cartItemsDetailed.push({
                                product: resProduct,
                                quantity: cardItem.quantity,
                            })
                        })
                })
            })
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    backToShop() {
        this.router.navigate(['/products'])
    }

    deleteCartItem(cardItem: CartItemDetailed) {
        this.cartService.deleteCartItem(cardItem.product.id)
    }

    updateCartItemQuantity(event, cartItemDetailed: CartItemDetailed) {
        const cartItem: CartItem = {
            productId: cartItemDetailed.product.id,
            quantity: event.value,
        }
        this.cartService.setCartItem(cartItem, true)
    }
}
