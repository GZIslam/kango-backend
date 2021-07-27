import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateWordDto {
    @ApiProperty({example: 'Помидор', description: 'Само слово'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;

    @ApiProperty({example: 'Овощь', description: 'Описание слова'})
    @IsString({message: "Должно быть строкой"})
    @IsOptional()
    readonly description: string;

    @ApiProperty({example: 'Tomato', description: 'Перевод слова'})
    @IsString({message: "Должно быть строкой"})
    readonly translate: string;

    @ApiProperty({example: '123', description: 'ID коллекции'})
    @IsNumber({}, {message: "Должно быть числом"})
    @IsOptional()
    collectionId: number;
}
