import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserCollections} from "./user-collections.model";
import { CollectionWords } from "src/words/collection-words.model";
import { Word } from "src/words/word.model";

interface CollectionCreationAttrs {
    value: string;
    description: string;
    userId: number;
    custom: boolean;
}

@Table({tableName: 'collections'})
export class Collection extends Model<Collection, CollectionCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Испанский мат', description: 'Название коллекции'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    value: string;

    @ApiProperty({example: 'По приколу', description: 'Описание колекции'})
    @Column({type: DataType.STRING})
    description: string;

    @ApiProperty({example: 'true || false', description: 'custom || default'})
    @Column({type: DataType.BOOLEAN})
    custom: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsToMany(() => User, () => UserCollections)
    users: User[];

    @BelongsToMany(() => Word, () => CollectionWords)
    words: Word[];
}
