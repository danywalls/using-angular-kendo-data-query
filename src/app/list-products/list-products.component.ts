import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-products',
  template: `
    <div *ngFor="let item of products" class="product">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <span>{{ item.price | currency }}</span>
    </div>
  `,
})
export class ListProductsComponent {
  @Input() products: any;
}
