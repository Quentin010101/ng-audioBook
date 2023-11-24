import { SearchItem } from "./SearchItemModel";

export class SearchContainer {
    public constructor(init?: Partial<SearchContainer>) {
        Object.assign(this, init);
    }
    items!: SearchItem[]
    totalItems!: number
}