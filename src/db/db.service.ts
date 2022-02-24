import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmarks } from 'src/schemas/bookmarks.model';
import { Users } from 'src/schemas/users.model';


@Injectable()
export class DbService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<Users>,
        @InjectModel('Bookmarks') private readonly bookmarksModel: Model<Bookmarks>) {

    }
}