import {Component} from '@angular/core';
import {
  aggregateBy,
  AggregateDescriptor,
  AggregateResult,
  filterBy,
  FilterDescriptor,
  FilterOperator, GroupDescriptor,
  orderBy,
  process,
  SortDescriptor
} from "@progress/kendo-data-query";
import {mockProducts} from "./mock-products";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  categories: any = [];
  total : any = 0.00;
  products = mockProducts

  sortDescriptor: SortDescriptor = {field: 'price', dir: 'asc'};
  filterDescriptor: FilterDescriptor = {field: 'name', operator: FilterOperator.EqualTo, value: '', };
  groupDescriptor: GroupDescriptor[] = [{field: 'category'}];
  sortProductsAsc() {
    this.sortDescriptor.dir = 'asc';
    this.products = orderBy(this.products, [this.sortDescriptor]);
  }
  sortProductsDesc() {
    this.sortDescriptor.dir = "desc";
    this.products = orderBy(this.products, [this.sortDescriptor]);
  }
  filterBy(nameInput: HTMLInputElement) {
    if (nameInput.value) {
      this.filterDescriptor.value = nameInput.value;
      this.products = filterBy(this.products, this.filterDescriptor);
    }
  }

  showGroup() {
        this.categories = process(this.products, {group: this.groupDescriptor}).data
  }
  showTotal() {
    const aggregateByPriceSum : AggregateDescriptor  =
      {field: "price", aggregate: "sum"};

    const aggregateResult: AggregateResult = aggregateBy(this.products,  [aggregateByPriceSum]);
    this.total = aggregateResult['price'].sum;
  }
}

