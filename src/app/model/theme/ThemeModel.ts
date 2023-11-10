export class Theme{
    id!: number
    color!: string
    className!: string

    constructor(color: string, className: string, id: number){
        this.id = id
        this.color = color
        this.className = className
    }


}