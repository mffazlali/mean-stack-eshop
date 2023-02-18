import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CartItem, CartService } from '@eshop/orders'
import { Product } from '../../models/product'

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: [],
})
export class ProductItemComponent {
    @Input() product: Product
    isProductURL = false

    constructor(private router: Router, private cartService: CartService) {}

    showImageDetail(productId: string) {
        this.router.navigate(['products', productId])
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1,
        }
        this.cartService.setCartItem(cartItem)
    }
}
