export interface InputUpdateCustomerDto{
    id: string;
    name: string;
    address :{
        street: string;
        city: string;
        number: string;
        zip: string;
    };
}

export interface OutputUpdateCustomerDto{
    id: string;
    name: string;
    address :{
        street: string;
        city: string;
        number: string;
        zip: string;
    };
}