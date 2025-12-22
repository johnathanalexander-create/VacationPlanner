import PackedItem from "./packed_item.model";

export default interface PackSet{
	id:number,
	packedItems:PackedItem[],
	title:string
}