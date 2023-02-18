import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { Category } from '../../models/category'
import { Product } from '../../models/product'
import { CategoriesService } from '../../services/categories.service'
import { ProductsService } from '../../services/products.service'

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[]
    categories: Category[]
    endsubs$: Subject<any> = new Subject()
    isCategoryPage: boolean

    constructor(
        private prodService: ProductsService,
        private catService: CategoriesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            params.categoryid
                ? this._getProducts([params.categoryid])
                : this._getProducts()
            params.categoryid
                ? (this.isCategoryPage = true)
                : (this.isCategoryPage = false)
        })
        this._getCategories()
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.prodService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products
            })
    }

    private _getCategories() {
        this.catService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories
            })
    }

    categoryFilter() {
        const selectedCategories = this.categories
            .filter((category) => category.checked)
            .map((category) => category.id)
        this._getProducts(selectedCategories)
    }
}
