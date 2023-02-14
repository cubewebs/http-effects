import { Food } from './Food';
export interface Order {
	id: number,
	userId: number, 
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	address: string,
	zip: string,
	foodOrder: Food[]
}

