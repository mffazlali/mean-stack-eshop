import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpParams } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { CheckboxModule } from 'primeng/checkbox'
import { RatingModule } from 'primeng/rating'
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component'
import { ProductItemComponent } from './components/product-item/product-item.component'
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component'
import { ProductsListComponent } from './pages/products-list/products-list.component'
import { ProductsSearchComponent } from './components/products-search/products-search.component'
import { ProductPageComponent } from './pages/product-page/product-page.component'
import { UiModule } from '@eshop/ui'
import { productRoutes } from './lib.routes'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(productRoutes),
        FormsModule,
        HttpClientModule,
        UiModule,
        ButtonModule,
        InputNumberModule,
        CheckboxModule,
        RatingModule,
    ],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        FeaturedProductsComponent,
        ProductItemComponent,
        ProductsListComponent,
        ProductPageComponent,
    ],
    exports: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        FeaturedProductsComponent,
        ProductItemComponent,
        ProductsListComponent,
        ProductPageComponent,
    ],
})
export class ProductsModule {}
