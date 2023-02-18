import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import {
    ProductsService,
    Product,
    Category,
    CategoriesService,
} from '@eshop/products'
import { MessageService } from 'primeng/api'
import { timer } from 'rxjs'

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: [],
})
export class ProductsFormComponent implements OnInit {
    form: FormGroup
    isSubmitted = false
    editMode = false
    currentProductID = ''
    categories: Category[] = []
    imageDisplay: string | ArrayBuffer | null = null

    constructor(
        private formbuilder: FormBuilder,
        private ProductsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {
        this.form = new FormGroup({})
    }

    ngOnInit() {
        this._initProductsForm()
        this._getCategories()
        this._checkEditMode()
    }

    private _initProductsForm() {
        this.form = this.formbuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false],
        })
        this.form.controls['price'].setValue(null)
        this.form.controls['countInStock'].setValue(null)
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories
        })
    }

    onSubmit() {
        this.isSubmitted = true
        if (this.form.invalid) {
            return
        }
        const productFormData = new FormData()
        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value)
        })
        if (this.editMode) {
            productFormData.append('id', this.currentProductID)
            this._updateProduct(productFormData)
        } else {
            this._createProduct(productFormData)
        }
    }

    onCancel() {
        this._backLocation()
    }

    onImageUpload(event: any) {
        const file = event.target.files[0]
        if (file) {
            const fileReader = new FileReader()
            this.form.patchValue({ image: file })
            this.form.get('image')?.updateValueAndValidity()
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result
            }
            fileReader.readAsDataURL(file)
        }
    }

    get productForm() {
        return this.form.controls
    }

    private _backLocation() {
        this.location.back()
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true
                this.currentProductID = params['id']
                this.ProductsService.getProduct(
                    this.currentProductID
                ).subscribe((product) => {
                    this.form.controls['name'].setValue(product.name)
                    this.form.controls['brand'].setValue(product.brand)
                    this.form.controls['price'].setValue(product.price)
                    this.form.controls['countInStock'].setValue(
                        product.countInStock
                    )
                    this.form.controls['category'].setValue(
                        product.category?.id
                    )
                    this.form.controls['isFeatured'].setValue(
                        product.isFeatured
                    )
                    this.form.controls['description'].setValue(
                        product.description
                    )
                    this.form.controls['richDescription'].setValue(
                        product.richDescription
                    )
                    this.imageDisplay = product.image ? product.image : null
                    this.productForm['image'].setValidators([])
                    this.productForm['image'].updateValueAndValidity()
                    this.form.controls['images'].setValue(product.images)
                })
            }
        })
    }

    private _createProduct(productData: FormData) {
        this.ProductsService.createProduct(productData).subscribe({
            next: (Product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${Product.name} is created!`,
                })
                timer(2000).subscribe(() => {
                    this._backLocation()
                })
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not created!',
                })
            },
        })
    }

    private _updateProduct(productData: FormData) {
        this.ProductsService.updateProduct(productData).subscribe({
            next: (Product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${Product.name} is updated!`,
                })
                timer(2000).subscribe(() => {
                    this._backLocation()
                })
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not updated!',
                })
            },
        })
    }
}
