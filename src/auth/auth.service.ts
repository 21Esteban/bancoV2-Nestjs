import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { response } from 'src/helpers/response';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {

    //Inyectamos las dependencias 

    constructor(
      @InjectRepository(User) private userRepository:Repository<User>,
      private jwtService: JwtService
    ) {}

    async register(reply: FastifyReply, createUserDto: CreateUserDto) {
      try {
        const { email } = createUserDto;
        
        const user = await this.userRepository.findOne({where:{email}})
        
        // ** cancelo el servicio si el usuario existe
        if (user) {
          return response(reply,400,false,"","El email ya se encuentra registrado");
        }
  
        const newClient = this.userRepository.create(createUserDto);
        await this.userRepository.save(newClient);
  
        const token = this.jwtService.sign({
          //metemos en el payload del token el id del usuario y el rol , el rol es necesario para las rutas protegidas por roles
          id: newClient.id,
          role: newClient.role,
        });
  
        return response(
          reply,
          201,
          true,
          {
            ...newClient,
            password: null,
            token,
          },
          'Registro exitoso, ahora puedes iniciar sesión.',
        );
      } catch (error: any) {
        return this.catch(reply, error);
      }
    }

    // * ESTE METODO SIRVE PARA LOGUEAR A CUALQUIER USUARIO (CLIENT, SUPERVISOR, MECHANIC, ADMIN)
  async login(reply: FastifyReply, loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.userRepository.findOne({where:{email}})

      if (user && user.matchPassword(password)) {
        // Si se encontró al usuario y la contraseña es correcta, realizar la respuesta de login y generar token
        // const token = this.jwtService.sign({ id: user.id, role: user.role });
        const token = this.jwtService.sign({ ...user, password: null });
        return response(
          reply,
          200,
          true,
          {
            ...user,
            password: null,
            token,
          },
          `Bienvenido ${user.name}`,
        );
      }
      // Si no se encontró al usuario o la contraseña es incorrecta, retornar error
      return response(reply, 400, false, '', 'Email o password incorrectos');
    } catch (error) {
      return this.catch(reply, error);
    }
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  catch(reply: FastifyReply, error: any) {
    return response(reply, 500, false, '', error.message);
  }
}
