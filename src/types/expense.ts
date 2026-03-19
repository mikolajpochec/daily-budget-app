export default interface Expense {
	id: number;
	amount: number;
	category: string;
	description?: string;
	createdAt: number;
	localDate: string;
};
