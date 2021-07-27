import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CollectionWords} from "./collection-words.model";
import { Collection } from "src/collections/collection.model";
import { IsOptional } from "class-validator";

interface WordCreationAttrs {
    value: string;
    translate: string;
    description: string;
    collectionId: number;
}

@Table({tableName: 'words'})
export class Word extends Model<Word, WordCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Dick', description: 'Слово'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    value: string;

    @ApiProperty({example: 'Хуй', description: 'Перевод'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    translate: string;

    @ApiProperty({example: 'По приколу', description: 'Описание'})
    @Column({type: DataType.STRING})
    description: string;

    @ForeignKey(() => Collection)
    @Column({type: DataType.INTEGER})
    collectionId: number;

    @BelongsToMany(() => Collection, () => CollectionWords)
    collections: Collection[];
}
