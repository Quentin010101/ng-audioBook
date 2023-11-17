export const Validation = {
    pseudo: {
        required: true,
        maxLength: 10,
        minLength: 3,
    },
    email: {
        required: true,
        maxLength: 40
    },
    password: {
        required: true,
        maxLength: 40,
        minLength: 5,
    }
}