import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {CreateWordDto} from "./dto/create-word.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Word} from "./word.model";
import { CollectionsService } from 'src/collections/collections.service';
import { Collection } from 'src/collections/collection.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WordsService {

    constructor(@InjectModel(Word) private wordRepository: typeof Word,
        private collectionsService: CollectionsService) {}

    async createWord(dto: CreateWordDto, id: number) {
        let collection;
        if(!dto.collectionId || dto.collectionId === null) {
            console.log("EMPTY");
            collection = await this.collectionsService.getDefaultCollection(id);
            if(collection) {
            } else {
                collection = await this.collectionsService.addCollection({value: "Default", custom: false, description: "", userId: 0}, id);
            }
        } else {
            collection = await this.collectionsService.getCollectionById(dto.collectionId);
        }
        const word = await this.wordRepository.create(dto);
        console.log(word, collection);
        if (collection && word) {
            await collection.$add('words', word.id);
            return dto;
        }
        throw new HttpException('Не удалось создать коллекцию или найти пользователя.', HttpStatus.NOT_FOUND);
    }

    async getAll(id: number) {
        const collections = await this.collectionsService.getAll(id);
        let words = [];
        collections.forEach(collection => {
            collection.words.forEach(word => words.push(word));
        });
        console.log(words);
        return words;
    }

    async deleteWord(id: number) {
        const word = await this.wordRepository.findByPk(id);
        await word.destroy();
    }

    async getWordById(value: number) {
        const word = await this.wordRepository.findOne({where: {value}})
        return word;
    }

}
