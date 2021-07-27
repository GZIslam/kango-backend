import {ApiProperty} from "@nestjs/swagger";
import { IsNumber } from "class-validator";
export class DeleteDto {
    @ApiProperty({example: '123', description: 'ID записи'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly recId: number;
}
