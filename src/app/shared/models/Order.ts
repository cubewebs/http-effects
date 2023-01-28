export interface Order {
	id: number,
	userId: number, 
	address: string,
	orderName: string,
	phoneNumber: string,
	foodOrder: FoodOrder[]
}

export interface FoodOrder {
	foodId: number
}
