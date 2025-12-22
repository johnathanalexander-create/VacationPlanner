import PackSet from "./pack_set.model";
import PackedItem from './packed_item.model';

export default interface LuggageSet{
	id:number,
	title:string,
	packSets:PackSet[],
	packedItems:PackedItem[]
}