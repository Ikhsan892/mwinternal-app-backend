import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Response as Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, exeFileFilter } from 'src/utils';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 100, {
      storage: diskStorage({
        destination: './dist/app/files',
        filename: editFileName,
      }),
      fileFilter: exeFileFilter,
    }),
  )
  async create(
    @Body(new ValidationPipe()) createInventoryDto: CreateInventoryDto,
    @Res() response: Response,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    let data = await this.inventoryService.create(createInventoryDto, file);
    return response.status(data.status).json({ message: data.message });
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
