import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/menu/menu.service';
import { DeleteDTO } from 'src/pelanggan/dto/delete-massive.dto';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleService: Repository<Role>,
    private menuService: MenuService
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<any> {
    try {
      // Find data menu first
      let findData = await this.menuService.findBulk(createRoleDto.menu);

      let role = new Role();
      role.nama_role = createRoleDto.nama_role;
      role.menu = findData;
      await this.roleService.save(role);
      return {
        status: 201,
        message: "Success inserted"
      }
    } catch (er) {
      return new InternalServerErrorException();
    }
  }

  async findAll(): Promise<any> {
    return await this.roleService.find({
      relations: ['user', 'menu'],
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.roleService.findOne({
      where: {
        id
      }
    })
  }

  async removeMassive(body: DeleteDTO): Promise<any> {
    return body.id.map(async (i) => {
      return await this.roleService.softDelete(i);
    })

  }

  // async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
  //   return await this.roleService.update({ id }, updateRoleDto)
  // }

  async remove(id: number): Promise<any> {
    return await this.roleService.softDelete({ id: id });
  }
}
