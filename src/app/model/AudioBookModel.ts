export class AudioBook{
  public constructor(init?: Partial<AudioBook>) {
    Object.assign(this, init);
}
  id!: number
  title!: string
  summary!: string
  created!: Date
  fileName!: string
}