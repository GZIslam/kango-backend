import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {CreateCollectionDto} from "./dto/create-collection.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Collection} from "./collection.model";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CollectionsService {

    constructor(@InjectModel(Collection) private collectionRepository: typeof Collection,
        private usersService: UsersService) {}

    async addCollection(dto: CreateCollectionDto, id) {
        const user = await this.usersService.getUserById(id);
        dto.userId = id;
        const collection = await this.collectionRepository.create(dto);
        console.log(collection, user);
        if (collection && user) {
            await user.$add('collections', collection.id);
            return collection;
        }
        throw new HttpException('Не удалось создать коллекцию или найти пользователя.', HttpStatus.NOT_FOUND);
    }

    async getAll(userId: number) {
        const collections = await this.collectionRepository.findAll({where: {userId}, include: {all: true}})
        return collections;
    }

    async deleteCollection(id: number) {
        const collection = await this.collectionRepository.findByPk(id);
        await collection.destroy();
    }

    async getDefaultCollection(userId: number) {
        const collection = await this.collectionRepository.findOne({where: {userId, custom: false}, include: {all: true}});
        return collection;
    }

    async getCollectionById(value: number) {
        const collection = await this.collectionRepository.findByPk(value);
        return collection;
    }

}
