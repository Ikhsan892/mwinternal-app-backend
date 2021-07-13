import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuService: Repository<Menu>
  ) { }

  async findDuplicate(menu: string): Promise<boolean> {
    let find_data = await this.menuService.findOne({
      where: {
        link: menu
      }
    })
    if (find_data) return true;
    else return false;
  }

  async createMany(data: []): Promise<any> {
    return data.map(async (i) => {
      await this.create(i);
    })
  }


  async create(createMenuDto: CreateMenuDto): Promise<any> {
    let find_data = await this.findDuplicate(createMenuDto.link);

    // Kalo gak ada
    if (!find_data) {
      let menu = new Menu();
      menu.nama_menu = createMenuDto.nama_menu.toLowerCase();
      menu.link = createMenuDto.link;
      await this.menuService.save(menu);
      return {
        status: HttpStatus.CREATED,
        message: "Menu Created"
      }

    } else {
      return {
        status: HttpStatus.CONFLICT,
        message: "Menu already created"
      }
    }
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuService.find();
  }

  async findBulk(data: number[]): Promise<any> {
    return await this.menuService.findByIds(data);
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuService.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<any> {
    try {
      return await this.menuService.update({ id }, updateMenuDto);
    } catch (err) {
      return new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<any> {
    return await this.menuService.softDelete(id);
  }
}
