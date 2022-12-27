export interface EstablishmentModel {
    id: string;
    city: string;
    country: string;
    district: string;
    idCategoryEstablishment: number;
    idTypeRestaurant: number;
    name: string;
    number: number;
    state: string;
    statusActive: boolean;
    street: string;
    categoryEstablishment: string;
    typeRestaurant: string;
    uf: string;
    urlImage: string;
    zipcode: number;
    dateCreated: Date;
    dateUpdate: Date;
    cnpj: number;
}