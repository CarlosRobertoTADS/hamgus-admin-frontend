import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentModel } from 'src/app/models/establishment';
import { EstablishmentsService } from '../../services/establishments.service';

@Component({
  selector: 'app-new-establishment',
  templateUrl: './new-establishment.component.html',
  styleUrls: ['./new-establishment.component.css']
})
export class NewEstablishmentComponent implements OnInit {

  public formEstablishment: FormGroup;
  public requestEstablishment: any;
  public loading:boolean = false;
  public date:any;
  public categoryRestaurant = [];
  public categoryEstablishment = [];
  constructor(private establishmentService: EstablishmentsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.loadCategoryEstablishment();
    this.loadCategoryRestaurant();

    this.formEstablishment = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      typeEstablishment: new FormControl('', [Validators.required]),
      typeRestaurant: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });

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

  submit() {
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
        city: this.formEstablishment.get('city').value,
        country:"Brasil",
        district:this.formEstablishment.get('district').value,
        idCategoryEstablishment: this.formEstablishment.get('typeEstablishment').value,
        idTypeRestaurant: this.formEstablishment.get('typeRestaurant').value,
        name: this.formEstablishment.get('name').value,
        cnpj: this.formEstablishment.get('cnpj').value,
        number:this.formEstablishment.get('number').value,
        state:this.formEstablishment.get('state').value,
        statusActive:true,
        street:this.formEstablishment.get('street').value,
        typeEstablishment:idCategoryEstablishment.name,
        typeRestaurant:idTypeRestaurant.name,
        uf:"",
        urlImage:"",
        zipcode:this.formEstablishment.get('zipcode').value,
        dateCreated:this.date,
        dateUpdate:this.date
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
    this.establishmentService.create(establishment);
    this.loading = false;
    this.router.navigate(['establishments']);
  }

}
