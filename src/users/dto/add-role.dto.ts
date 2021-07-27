import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Название существующей роли'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;

    @ApiProperty({example: '123', description: 'ID пользователя'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}
