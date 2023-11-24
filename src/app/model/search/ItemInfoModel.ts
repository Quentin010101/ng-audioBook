export class ItemInfo {
    public constructor(init?: Partial<ItemInfo>) {
        Object.assign(this, init);
    }
    title!: string
    authors!: string[]
    categories!: string[]
    description!: string
    imageLinks!: {
        smallThumbnail: string,
        thumbnail: string
    }
    language!: string
}