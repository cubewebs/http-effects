import { Food } from './Food';
export interface Order {
	id: number,
	userId: number, 
	address: string,
	orderName: string,
	phoneNumber: string,
	foodOrder: Food[]
}

