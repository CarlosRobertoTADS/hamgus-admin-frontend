import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentModel } from 'src/app/models/establishment';
import { MenuModel } from 'src/app/models/menuModel';
import { ImageService } from 'src/app/shared/image/services/image.service';
import { EstablishmentsService } from '../../services/establishments.service';

@Component({
  selector: 'app-establishment-detail',
  templateUrl: './establishment-detail.component.html',
  styleUrls: ['./establishment-detail.component.css']
})
export class EstablishmentDetailComponent implements OnInit {

  public loading: boolean = false;
  public formEstablishment: FormGroup;
  public establishment:EstablishmentModel;
  public menu:MenuModel[];
  public date:any;
  public requestEstablishment: any;
  public categoryRestaurant = [];
  public categoryEstablishment = [];
  public dataSource: MatTableDataSource<MenuModel>;
  public idEstablishment;
  public imageUploaded;
  public timestamp;
  public urlImage;
  public urlImageDefault;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'price', 'status', 'editar', 'excluir','desativar'];
  @Input() valor: string;

  constructor(private uploadService: ImageService, private route: ActivatedRoute, private establishmentService:EstablishmentsService, private routeNavigate:Router) { }

  ngOnInit(): void {
    this.urlImageDefault = 'https://hamgus-establishments-assets.s3.us-east-2.amazonaws.com/default-logotipo-establishment.jpg';
    this.loadEstablishmentId();
    this.loadCategoryEstablishment();
    this.loadCategoryRestaurant();
    this.loadMenu();
    setTimeout(()=>{                           
      this.loadForm();
      this.loadTable(this.menu);
  }, 2000);
  }

  public loadEstablishmentId(){
    this.idEstablishment = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.establishmentService.getId(this.idEstablishment).subscribe((resp:EstablishmentModel)=>{
      this.establishment = resp;
      if(this.establishment && this.establishment.urlImage !== '' && this.establishment.urlImage !== null && this.establishment.urlImage !== undefined){
        this.urlImageDefault = this.establishment.urlImage;
      }
      
    })
  }

  loadTable(menu:MenuModel[]){
    this.dataSource = new MatTableDataSource(menu);
    setTimeout(()=>{                           
      this.loadPaginator(this.dataSource);
  }, 1000);
    this.loading = false;
  }

  public loadMenu(){
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.establishmentService.getMenu(id).subscribe((resp:MenuModel[])=>{
      console.log(resp);
      this.menu = resp;
    })
  }

  public loadCategoryEstablishment(){
    this.categoryEstablishment = [
      {'name':'Restaurante', 'id': 1},
      {'name':'Farmácia', 'id': 2},
      {'name':'Pet-Shop', 'id': 3}
    ];
  }

  public loadCategoryRestaurant(){
    this.categoryRestaurant = [
      {'name':'Lanchonete', 'id': 1},
      {'name':'Japonesa', 'id': 2}
    ];
    
    
  }

  public loadForm(){
    this.formEstablishment = new FormGroup({
      name: new FormControl(this.establishment.name, [Validators.required]),
      cnpj: new FormControl(this.establishment.cnpj, [Validators.required]),
      typeEstablishment: new FormControl(this.establishment.idCategoryEstablishment, [Validators.required]),
      typeRestaurant: new FormControl(this.establishment.idTypeRestaurant, [Validators.required]),
      zipcode: new FormControl(this.establishment.zipcode, [Validators.required]),
      street: new FormControl(this.establishment.street, [Validators.required]),
      number: new FormControl(this.establishment.number, [Validators.required]),
      district: new FormControl(this.establishment.district, [Validators.required]),
      city: new FormControl(this.establishment.city, [Validators.required]),
      state: new FormControl(this.establishment.state, [Validators.required]),
      urlImage:new FormControl(this.establishment.urlImage, [Validators.required]),
    });
    this.loading = false;
  }

  public submit(){
    let idCategoryEstablishment;
    let idTypeRestaurant;
    idCategoryEstablishment = this.categoryEstablishment.find(f =>
      f.id == +this.formEstablishment.get('typeEstablishment').value
    );
    idTypeRestaurant = this.categoryRestaurant.find(f=>
      f.id == +this.formEstablishment.get('typeRestaurant').value
    );

    if (this.formEstablishment.valid) {
      this.date = Date.now();
      this.requestEstablishment = {
        id: this.establishment.id,
        city: this.formEstablishment.get('city').value,
        district:this.formEstablishment.get('district').value,
        idCategoryEstablishment: this.formEstablishment.get('typeEstablishment').value,
        idTypeRestaurant: this.formEstablishment.get('typeRestaurant').value,
        name: this.formEstablishment.get('name').value,
        cnpj: this.formEstablishment.get('cnpj').value,
        number:this.formEstablishment.get('number').value,
        state:this.formEstablishment.get('state').value,
        street:this.formEstablishment.get('street').value,
        typeEstablishment: idCategoryEstablishment.name,
        typeRestaurant: idTypeRestaurant.name,
        zipcode:this.formEstablishment.get('zipcode').value,
        dateUpdate:this.date,
        urlImage: this.urlImage
    }
      console.log(this.requestEstablishment)
      this.loading = true;
      setTimeout(()=>{                           
        this.sendEstablishment(this.requestEstablishment);
    }, 3000);
       
    }
    else {

      console.error("ERRO DE VALIDAÇÃO DO FORMULARIO")
    }
  }

  sendEstablishment(establishment){
    this.establishmentService.update(establishment);
    this.uploadService.fileUploadEstablishment(this.imageUploaded, this.timestamp);
    this.loading = false;
    this.routeNavigate.navigate(['establishments']);
  }

  submitMenu(){
    this.routeNavigate.navigate(['detail/'+ this.idEstablishment +'/new-product']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id:number){
    this.routeNavigate.navigate(['detail/'+ this.idEstablishment +'/new-product/'+ id]);
  }

  delete(id:number){

  }

  deactivate(product:MenuModel){
    if(product.statusActive){
      product.statusActive = false;
    }
    else{
      product.statusActive = true;
    }
    this.establishmentService.updateProduct(product, this.idEstablishment);
    // this.loadData();
  }

  loadPaginator(datasource){
    datasource.paginator = this.paginator;
    datasource.sort = this.sort;
  }

  receiveImage(file){
    const urlAws = 'https://hamgus-establishments-assets.s3.us-east-2.amazonaws.com/';
    const current = new Date();
    const timestamp = current.getTime();
    this.imageUploaded = file;
    this.timestamp = timestamp;
    this.urlImage = urlAws + this.imageUploaded.name + timestamp;
    this.formEstablishment.controls['urlImage'].setValue(this.urlImage);
    // console.log(file);
  }

}
