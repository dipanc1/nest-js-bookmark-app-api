import { Controller,Get } from '@nestjs/common';
import { DbService } from './db.service';


@Controller('db')
export class DbController{


    constructor(private dbService:DbService){}

    // @Get('get')
    // async get(){
    //    return {
    //        Students: await this.testService.getStudent(),
    //        Animals: await this.testService.getAnimals()
    //    }
    // }
}