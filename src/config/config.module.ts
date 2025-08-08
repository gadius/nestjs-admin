import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions as NestConfigModuleOptions,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestConfigModule.forRoot(<NestConfigModuleOptions>{
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || '',
        autoLoadEntities: true,
        synchronize: true, // Set to true only in development
      }),
    }),
  ],
})
export class ConfigModule {}
