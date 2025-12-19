export class Auth {
    constructor(
        public id: string,
        public userId: string,
        public passwordHash: string,
    ) {}
}
