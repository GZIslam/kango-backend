import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/user.decorator';
import { DeleteDto } from 'src/users/dto/delete.dto';
import { Collection } from './collection.model';
import {CollectionsService} from "./collections.service";
import {CreateCollectionDto} from "./dto/create-collection.dto";

@ApiTags('Коллекции')
@Controller('collections')
export class CollectionsController {
    constructor(private collectionService: CollectionsService) {}

    @ApiOperation({summary: 'Создать коллекцию'})
    @ApiResponse({status: 200, type: Collection})
    @Post()
    addCollection(@Body() dto: CreateCollectionDto, @CurrentUser("id") id: number) {
        return this.collectionService.addCollection(dto, id);
    }

    @ApiOperation({summary: 'Получить список коллекций пользователя'})
    @ApiResponse({status: 200, type: [Collection]})
    @Get()
    getCollections(@CurrentUser('id') id: number) {
        return this.collectionService.getAll(id);
    }

    @ApiOperation({summary: 'Удалить коллекцию'})
    @ApiResponse({status: 200})
    @Delete()
    deleteCollection(@Body() dto: DeleteDto) {
        return this.collectionService.deleteCollection(dto.recId);
    }

    @ApiOperation({summary: 'Получить коллекцию'})
    @ApiResponse({status: 200, type: Collection})
    @Get('/:id')
    getByValue(@Param('id') value: number) {
        return this.collectionService.getCollectionById(value);
    }
}
