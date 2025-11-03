import PrepaymentSource from '../../models/vacation-planner/prepayment_source.model';

export default interface Prepayment{
	id: number,
	vacation_id: number,
	description: string,
	type: string,
	vendor: string,
	isRefundable: boolean,
	isRefundRequested: boolean,
	isRefundReceived: boolean,
	amount: number,
	paymentSource: PrepaymentSource,
	notes: string,
	meta:{
		cashback: 0,
		amountTooltip: "",
		paymentSourceTooltip: ""
	}
}