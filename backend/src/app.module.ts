import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SlotsModule } from './slots/slots.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    PrismaModule,
    SlotsModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
