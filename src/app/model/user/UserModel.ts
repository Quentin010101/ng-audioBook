import { Role } from "./RoleModel"

export class User{
    id!: number
    pseudo!: string
    email!: string
    role!: Role
}