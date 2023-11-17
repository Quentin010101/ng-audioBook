export class SignInRequest{
    public constructor(init?: Partial<SignInRequest>) {
        Object.assign(this, init);
    }
    pseudo!: string
    email!: string
    password!: string
}