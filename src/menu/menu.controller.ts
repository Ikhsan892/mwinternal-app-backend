import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuManyDto } from './dto/create-many.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post('create-many')
  createMany(@Body(new ValidationPipe()) req: CreateMenuManyDto) {
    return this.menuService.createMany(req.data);
  }

  @Post()
  create(@Body(new ValidationPipe()) createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
