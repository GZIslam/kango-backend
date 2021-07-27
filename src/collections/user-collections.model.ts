import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Collection} from "./collection.model";


@Table({tableName: 'user_collections', createdAt: false, updatedAt: false})
export class UserCollections extends Model<UserCollections> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Collection)
    @Column({type: DataType.INTEGER})
    collectionId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}
