import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCollectionDto {
    @ApiProperty({example: 'Супер-коллекция', description: 'Название коллекции'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;

    @ApiProperty({example: 'Для того что бы круто говорить.', description: 'Описание коллекции'})
    @IsString({message: "Должно быть строкой"})
    readonly description: string;

    @ApiProperty({example: 'true || false', description: 'custom || default'})
    @IsOptional()
    @IsBoolean({message: "Должно быть boolean"})
    custom: boolean;

    @ApiProperty({example: '123', description: 'ID пользователя'})
    @IsOptional()
    @IsNumber({}, {message: "Должно быть числом"})
    userId: number;
}
