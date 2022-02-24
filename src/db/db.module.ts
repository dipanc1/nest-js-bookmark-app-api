import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import { bookmarksSchema } from 'src/schemas/bookmarks.schema';
import { usersSchema } from 'src/schemas/users.schema';
import { DbService } from './db.service';
import { DbController } from './db.controller';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            {
                name: 'Users',
                schema: usersSchema,
                collection: 'Users',

            },
        ], 'UsersDb'),
        MongooseModule.forFeature([
            {
                name: 'Bookmarks',
                schema: bookmarksSchema,
                collection: 'Bookmarks'
            }
        ], 'BookmarksDb'),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frufg.mongodb.net/Bookmarks-Nestjs?retryWrites=true&w=majority`,
            {
                connectionName: 'BookmarksDb',
                useNewUrlParser: true,
            }
        ),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frufg.mongodb.net/Bookmarks-Nestjs?retryWrites=true&w=majority`,
            {
                connectionName: 'UsersDb',
                useNewUrlParser: true,
            }
        )
    ],
    controllers: [DbController],
    providers: [DbService],
})
export class DbModule { }