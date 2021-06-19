import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleService: Repository<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<any> {
    try {
      await this.roleService.save(createRoleDto);
      return {
        status: 201,
        message: "Success inserted"
      }
    } catch (er) {
      return new InternalServerErrorException();
    }
  }

  async findAll(): Promise<any> {
    return await this.roleService.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.roleService.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    return await this.roleService.update({ id }, updateRoleDto)
  }

  async remove(id: number): Promise<any> {
    return await this.roleService.softDelete({ id: id });
  }
}
