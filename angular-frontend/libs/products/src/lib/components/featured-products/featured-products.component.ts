import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs'
import { Product } from '../../models/product'
import { ProductsService } from '../../services/products.service'

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: [],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    featuredProducts: Product[]
    endsubs$: Subject<any> = new Subject()

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this._getFeaturedProducts()
    }

    private _getFeaturedProducts() {
        this.productsService
            .getFeaturedProducts(4)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.featuredProducts = products
            })
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete
    }
}
