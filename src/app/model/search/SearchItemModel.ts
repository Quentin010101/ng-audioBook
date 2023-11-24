import { ItemInfo } from "./ItemInfoModel";

export class SearchItem {
    public constructor(init?: Partial<SearchItem>) {
        Object.assign(this, init);
    }
    volumeInfo!: ItemInfo
}