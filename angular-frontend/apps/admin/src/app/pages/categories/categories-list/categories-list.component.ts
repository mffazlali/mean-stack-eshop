import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Category, CategoriesService } from '@eshop/products'
import { MessageService, ConfirmationService } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = []
    endsubs$: Subject<any> = new Subject()

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this._getCategories()
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    deleteCategory(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            accept: () => {
                this.categoriesService
                    .deleteCategory(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        next: () => {
                            this._getCategories()
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Category is deleted!',
                            })
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Category is not deleted!',
                            })
                        },
                    })
            },
        })
    }

    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`)
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.categories = cats
            })
    }
}
