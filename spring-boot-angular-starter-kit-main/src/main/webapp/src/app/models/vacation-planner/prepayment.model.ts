
export default interface Prepayment{
	id: number,
	description: string,
	type: string,
	vendor: string,
	isRefundable: boolean,
	isRefundRequested: boolean,
	isRefundReceived: boolean,
	amount: number,
	paymentSource: string,
	notes: string
}