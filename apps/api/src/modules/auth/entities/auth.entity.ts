export class Auth {
    id: string = '';
    userId: string = '';
    passwordHash: string = '';

    constructor(partial?: Partial<Auth>) {
        Object.assign(this, partial);
    }
}


