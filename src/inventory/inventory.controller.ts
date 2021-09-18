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
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, exeFileFilter } from 'src/utils';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { DeleteSingleDTO } from './dto/delete-single.dto';

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
  async findAll(@Res() response: Response) {
    let data = await this.inventoryService.findAll();
    return response.status(201).json(data);
  }

  @Get(':nama_barang/:tipe_barang')
  async findOne(
    @Param('nama_barang') nama_barang: string,
    @Param('tipe_barang') tipe_barang: string,
    @Res() response: Response,
  ) {
    let data = await this.inventoryService.findOne(nama_barang, tipe_barang);

    if (!data) {
      return response.status(201).json({ message: 'data not found' });
    } else {
      return response.status(200).json({ message: 'found', data: data });
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Put('')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './dist/app/files',
        filename: editFileName,
      }),
      fileFilter: exeFileFilter,
    }),
  )
  async updateBarang(
    @Body(new ValidationPipe()) payload: UpdateInventoryDto,
    @UploadedFiles()
    file: Array<Express.Multer.File>,
    @Res() response: Response,
  ) {
    let data = await this.inventoryService.updateData(payload, file);
    return response.status(data.status).json({ message: data.message });
  }

  @Delete('')
  async remove(
    @Res() response: Response,
    @Body(new ValidationPipe()) deleteInventoryDto: DeleteDTO,
  ) {
    try {
      await this.inventoryService.remove(deleteInventoryDto);
      return response.status(200).json({ message: 'Data has been deleted' });
    } catch (error: any) {
      return response
        .status(422)
        .json({ message: 'Something wrong while deleting' });
    }
  }

  @Delete('/single')
  async RemoveOne(
    @Res() response: Response,
    @Body(new ValidationPipe()) deleteSingleDto: DeleteSingleDTO,
  ) {
    let return_data = await this.inventoryService.removeOne(deleteSingleDto);
    if (return_data.deleted) {
      return response
        .status(200)
        .json({ message: 'data Hass ben deleted', data: return_data.data });
    } else {
      return response.status(422).json({
        message: 'Something Wrong while deleting data',
        data: return_data.data,
      });
    }
  }
}
