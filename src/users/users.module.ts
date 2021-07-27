import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import { UserCollections } from 'src/collections/user-collections.model';
import { Collection } from 'src/collections/collection.model';
import { CollectionsModule } from 'src/collections/collections.module';
import { Word } from 'src/words/word.model';
import { CollectionWords } from 'src/words/collection-words.model';
import { WordsModule } from 'src/words/words.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post, UserCollections, Collection, Word, CollectionWords ]),
      RolesModule,
      CollectionsModule,
      WordsModule,
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
