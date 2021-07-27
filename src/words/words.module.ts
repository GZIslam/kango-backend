import {forwardRef, Module} from '@nestjs/common';
import {WordsService} from './words.service';
import {WordsController} from './words.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Word} from "./word.model";
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  providers: [WordsService],
  controllers: [WordsController],
  imports: [
    SequelizeModule.forFeature([Word]),
    forwardRef(() => CollectionsModule),
  ],
  exports: [
    WordsService
  ]
})
export class WordsModule {}
