export interface InputListCustomerDto{}

type Customer ={id: string;
    name: string;
    address :{
        street: string;
        city: string;
        number: string;
        zip: string;
    }
};

export interface OutputListCustomerDto{
    customers: Customer[];
}