import {forwardRef, Module} from '@nestjs/common';
import {CollectionsService} from './collections.service';
import {CollectionsController} from './collections.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Collection} from "./collection.model";
import { UsersModule } from '../users/users.module';

@Module({
  providers: [CollectionsService],
  controllers: [CollectionsController],
  imports: [
    SequelizeModule.forFeature([Collection]),
    forwardRef(() => UsersModule),
  ],
  exports: [
    CollectionsService
  ]
})
export class CollectionsModule {}
