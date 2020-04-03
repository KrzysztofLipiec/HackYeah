import { IncomingMessage } from 'connect';
import { Response } from 'express';

import { IData } from '../interfaces/IData';
import { IUser } from '../interfaces/IUser';
import { AbstractRouterHandler } from './AbstractRouterHandler';

export class Authentication extends AbstractRouterHandler {
    constructor(private users: Array<IUser> = []) {
        super();
        if (!this.users.length) {
            this.users.push({
                username: 'testUser'
            });
        }
        this.router.route('/auth')
            .post(this.returnUser.bind(this));
    }

    private returnUser(req: IncomingMessage, res: Response, next: () => void): void {
        res.json(this.users[0]);
    }

    public getData(data: IData): void {
        data.users = this.users;
    }
}