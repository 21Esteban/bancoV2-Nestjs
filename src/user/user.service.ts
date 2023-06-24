import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { FastifyReply } from 'fastify';
import { response } from 'src/helpers/response';

@Injectable()
export class UserService {

  //Inyectamos el repositorio para poder hacer operaciones con el.
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  
  //La creacion de usuarios y logueo lo vamos a manejar en un modulo aparte , (Auth)
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(reply:FastifyReply) {
    try {
      
      const users = await this.userRepository.find()
      return response(reply, 200, true, users, 'lista de usuarios');
    } catch (error) {
      return this.catch(reply, error);
    }
  }

  async findOne(id: number,reply:FastifyReply) {
    try {
      const user = await this.userRepository.findOne({where:{id}})
      if (!user) {
        return response(reply, 404, false, '', 'usuario no encontrado');
      }

      return response(reply, 200, true, user, 'usuario encontradp');
    } catch (error) {
      return this.catch(reply, error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  catch(reply: FastifyReply, error: any) {
    return response(reply, 500, false, '', error.message);
  }
}
