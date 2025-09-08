import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entetiy';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])], //Entidades a las cuales podrian utilizar el reposiorio pattern
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //Exportar funciones para
})
export class UsersModule {}
