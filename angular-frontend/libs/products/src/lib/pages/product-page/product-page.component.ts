import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CartItem, CartService } from '@eshop/orders'
import { Subject, takeUntil } from 'rxjs'
import { Product } from '../../models/product'
import { ProductsService } from '../../services/products.service'

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product
    endsubs$: Subject<any> = new Subject()
    quantity = 1

    constructor(
        private prodService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProduct(params.productid)
            }
        })
    }

    private _getProduct(productId: string) {
        this.prodService
            .getProduct(productId)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((resProduct) => {
                this.product = resProduct
            })
    }

    addProductToCart() {
        const cardItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity,
        }

        this.cartService.setCartItem(cardItem)
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }
}
