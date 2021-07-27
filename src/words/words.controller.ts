import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {WordsService} from "./words.service";
import {CreateWordDto} from "./dto/create-word.dto";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from 'src/users/dto/delete.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Word } from './word.model';

@ApiTags('Слова')
@Controller('words')
export class WordsController {
    constructor(private wordService: WordsService) {}

    @ApiOperation({summary: 'Добавить слово'})
    @ApiResponse({status: 200, type: Word})
    @Post()
    addWord(@Body() dto: CreateWordDto, @CurrentUser("id") id: number) {
        return this.wordService.createWord(dto, id);
    }

    @ApiOperation({summary: 'Получить весь список слов пользователя'})
    @ApiResponse({status: 200, type: [Word]})
    @Get()
    getCollections(@CurrentUser('id') id: number) {
        return this.wordService.getAll(id);
    }

    @ApiOperation({summary: 'Удалить слово'})
    @ApiResponse({status: 200})
    @Delete()
    deleteWord(@Body() dto: DeleteDto) {
        return this.wordService.deleteWord(dto.recId);
    }

    @ApiOperation({summary: 'Получить слово'})
    @ApiResponse({status: 200, type: Word})
    @Get('/:id')
    getByValue(@Param('id') value: number) {
        return this.wordService.getWordById(value);
    }
}
