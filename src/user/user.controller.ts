import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FastifyReply } from 'fastify';

@Controller('user')
export class UserController {
  //inyectamos el servicio por que los decoradores lo necesitan ya que llaman esas funciones o metodos , los controladores son dependientes de el service , por eso el service es una dependencia de los controladores 
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Res() reply:FastifyReply) {
    return this.userService.findAll(reply);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res() reply:FastifyReply) {
    return this.userService.findOne(+id,reply);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
