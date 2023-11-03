import { AudioFile } from "./AudioFileModel";
import { Category } from "./CategoryModel";
import { ImageFile } from "./ImageFileModel";

export class AudioBook{
  public constructor(init?: Partial<AudioBook>) {
    Object.assign(this, init);
}
  id!: number
  title!: string
  created!: Date
  summary!: string
  category!: Category
  audioFile!: AudioFile
  imageFile!: ImageFile
}