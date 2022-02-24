import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import { bookmarksSchema } from 'src/schemas/bookmarks.schema';
import { usersSchema } from 'src/schemas/users.schema';
import { DbService } from './db.service';
import { DbController } from './db.controller';

@Global()
@Module({
    imports: [
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
            'mongodb+srv://dipan:Dipan123@cluster0.frufg.mongodb.net/Bookmarks-Nestjs?retryWrites=true&w=majority',
            {
                connectionName: 'BookmarksDb',
                
            }
        ),
        MongooseModule.forRoot(
            'mongodb+srv://dipan:Dipan123@cluster0.frufg.mongodb.net/Bookmarks-Nestjs?retryWrites=true&w=majority',
            {
                connectionName: 'UsersDb',
                useNewUrlParser: true,
            }
        )
    ],
    controllers: [DbController],
    providers: [DbService],
})
export class DbModule {}