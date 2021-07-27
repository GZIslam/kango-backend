import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Collection} from "../collections/collection.model";
import {Word} from "./word.model";


@Table({tableName: 'collection_words', createdAt: false, updatedAt: false})
export class CollectionWords extends Model<CollectionWords> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Collection)
    @Column({type: DataType.INTEGER})
    collectionId: number;

    @ForeignKey(() => Word)
    @Column({type: DataType.INTEGER})
    wordId: number;
}
