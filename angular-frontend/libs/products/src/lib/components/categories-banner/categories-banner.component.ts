import { Component, OnDestroy, OnInit } from '@angular/core'
import { takeUntil } from 'rxjs'
import { Subject } from 'rxjs'
import { Category } from '../../models/category'
import { CategoriesService } from '../../services/categories.service'

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = []
    endsubs$: Subject<any> = new Subject()

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit() {
        this._getCategories()
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories
            })
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }
}
