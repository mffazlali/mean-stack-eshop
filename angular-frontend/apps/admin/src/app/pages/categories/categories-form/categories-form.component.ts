import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CategoriesService, Category } from '@eshop/products'
import { MessageService } from 'primeng/api'
import { timer } from 'rxjs'

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: [],
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup
    isSubmitted = false
    editMode = false
    categoriesCurrentID = ''

    constructor(
        private formbuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {
        this.form = new FormGroup({})
    }

    ngOnInit() {
        this._initCategoriesForm()
        this._checkEditMode()
    }

    private _initCategoriesForm() {
        this.form = this.formbuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff'],
        })
    }

    onSubmit() {
        this.isSubmitted = true
        if (this.form.invalid) {
            return
        }
        const category: Category = {
            id: this.categoriesCurrentID,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value,
        }
        if (this.editMode) {
            this._updateCategory(category)
        } else {
            this._createCategory(category)
        }
    }

    onCancel() {
        this._backLocation()
    }

    get categoryForm() {
        return this.form.controls
    }

    private _backLocation() {
        this.location.back()
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true
                this.categoriesCurrentID = params['id']
                this.categoriesService
                    .getCategory(this.categoriesCurrentID)
                    .subscribe((category) => {
                        this.form.controls['name'].setValue(category.name)
                        this.form.controls['icon'].setValue(category.icon)
                        this.form.controls['color'].setValue(category.color)
                    })
            }
        })
    }

    private _createCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe({
            next: (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is created!`,
                })
                timer(2000).subscribe(() => {
                    this._backLocation()
                })
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created!',
                })
            },
        })
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe({
            next: (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is updated!`,
                })
                timer(2000).subscribe(() => {
                    this._backLocation()
                })
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not updated!',
                })
            },
        })
    }
}
