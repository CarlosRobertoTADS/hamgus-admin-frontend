import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/models/menuModel';
import { ImageService } from 'src/app/shared/image/services/image.service';
import { EstablishmentsService } from '../../services/establishments.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public idProduct;
  public idEstablishment;
  public formProduct: FormGroup;
  public requestProduct: any;
  public loading: boolean = false;
  public date: any;
  public categoryMenuProduct = [];
  public product: MenuModel;
  public idCategoryMenuProduct;
  public imageUploaded;
  public timestamp;
  public urlImage;
  public urlImageDefault;
  constructor(private uploadService: ImageService, private establishmentService: EstablishmentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.urlImageDefault = 'https://hamgus-establishments-assets.s3.us-east-2.amazonaws.com/default-logotipo-establishment.jpg';
    this.idEstablishment = this.route.snapshot.paramMap.get('id');
    this.idProduct = this.route.snapshot.paramMap.get('idProduct');
    console.log(this.idEstablishment);
    console.log(this.idProduct);
    this.loadCategoryMenu();
    this.loadProductId();
    setTimeout(() => {
      this.loadForm();
    }, 2000);
  }

  public loadProductId() {
    this.loading = true;
    this.establishmentService.getIdMenu(this.idProduct, this.idEstablishment).subscribe((resp: MenuModel) => {
      this.product = resp;
      if(this.product && this.product.urlImage !== '' && this.product.urlImage !== null && this.product.urlImage !== undefined){
        this.urlImageDefault = this.product.urlImage;
      }
      this.idCategoryMenuProduct = this.categoryMenuProduct.find(f => f.name === this.product.categoryMenu);
    })
  }

  public loadCategoryMenu() {
    this.categoryMenuProduct = [
      { 'name': 'Principal', 'id': 1 },
      { 'name': 'Combo', 'id': 2 },
      { 'name': 'Promo????o', 'id': 3 },
      { 'name': 'Mais Pedidos', 'id': 4 },
      { 'name': 'Gerais', 'id': 5 }
    ];
  }

  public loadForm() {
    this.formProduct = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required, Validators.maxLength(32)]),
      price: new FormControl(this.product.price, [Validators.required]),
      categoryMenu: new FormControl(this.idCategoryMenuProduct.id, [Validators.required]),
      sideDish: new FormControl(this.product.sideDish, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required]),
      urlImage:new FormControl(this.product.urlImage, [Validators.required]),
    });
    this.loading = false;
  }

  public submit(){
    let idCategoryMenuProduct;
    idCategoryMenuProduct = this.categoryMenuProduct.find(f =>
      f.id == +this.formProduct.get('categoryMenu').value
    );
  

    if (this.formProduct.valid) {
      this.date = Date.now();
      this.requestProduct = {
        id: this.product.id,
        price: this.formProduct.get('price').value,
        sideDish:this.formProduct.get('sideDish').value,
        name: this.formProduct.get('name').value,
        description: this.formProduct.get('description').value,
        categoryMenu:idCategoryMenuProduct.name,
        urlImage:this.formProduct.get('urlImage').value,
        dateUpdate:this.date
    }
      console.log(this.requestProduct)
      this.loading = true;
      setTimeout(()=>{                           
        this.sendProduct(this.requestProduct);
    }, 3000);
       
    }
    else {

      console.error("ERRO DE VALIDA????O DO FORMULARIO")
    }

    
  }

  sendProduct(product:MenuModel){
    this.establishmentService.updateProduct(product, this.idEstablishment);
    if(this.imageUploaded != '' && this.imageUploaded != null && this.imageUploaded != undefined){
      this.uploadService.fileUploadProducts(this.imageUploaded, this.timestamp);
    };
    this.loading = false;
    this.router.navigate(['establishments/detail/'+ this.idEstablishment]);
  }

  receiveImage(file){
    const urlAws = 'https://hamgus-products-assets.s3.us-east-2.amazonaws.com/';
    const current = new Date();
    const timestamp = current.getTime();
    this.imageUploaded = file;
    this.timestamp = timestamp;
    this.urlImage = urlAws + this.imageUploaded.name + timestamp;
    this.formProduct.controls['urlImage'].setValue(this.urlImage);
    // console.log(file);
  }

}
