import { Component, OnInit } from "@angular/core";
// Navigation Router
import { Router } from "@angular/router";
// Services
import { ProductService } from "../product.service";
// Product Interface
import { Product } from "../product.model";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  createProduct(): void {
    if (this.product.price > 1000) {
      this.productService.create(this.product).subscribe(
        () => {
          this.productService.showMessage("Produto cadastrado com sucesso!");
          this.router.navigate(["/products"]);
        },
        (err) => {
          this.productService.showMessage(
            `
            Falha ao cadastrar.
          `
          );
        }
      );
    } else {
      this.productService.showMessage(
        `
        Produtos de preço menor que R$1000,00 não são permitidos.
      `
      );
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
