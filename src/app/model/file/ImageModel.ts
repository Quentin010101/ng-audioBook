export class ImageM {
    constructor(id: number, data: Blob){
        this.id = id
        this.data = data
    }
    id!: number
    data!: Blob
}