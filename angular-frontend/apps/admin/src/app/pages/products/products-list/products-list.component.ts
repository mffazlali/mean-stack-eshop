import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Product, ProductsService } from '@eshop/products'
import { MessageService, ConfirmationService } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = []
    endsubs$: Subject<any> = new Subject()

    constructor(
        private productsService: ProductsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this._getProducts()
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    deleteProduct(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            accept: () => {
                this.productsService
                    .deleteProduct(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        next: () => {
                            this._getProducts()
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'product is deleted!',
                            })
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'product is not deleted!',
                            })
                        },
                    })
            },
        })
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`)
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((product) => {
                this.products = product
            })
    }
}
