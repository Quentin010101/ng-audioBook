
import { Category } from "../category/CategoryModel";
import { AudioFile } from "./AudioFileModel";
import { ImageFile } from "./ImageFileModel";

export class AudioBook{
  public constructor(init?: Partial<AudioBook>) {
    Object.assign(this, init);
}
  id!: number
  title!: string
  author!: string
  created!: Date
  summary!: string
  category!: Category
  audioFile!: AudioFile
  imageFile!: ImageFile
}