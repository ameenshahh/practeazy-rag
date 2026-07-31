import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RagModule } from './rag/rag.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({

      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({

        type: 'postgres',

        host: configService.get('DB_HOST'),

        port: Number(
          configService.get('DB_PORT'),
        ),

        username:
          configService.get('DB_USERNAME'),

        password:
          configService.get('DB_PASSWORD'),

        database:
          configService.get('DB_NAME'),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    RagModule,
  ],
})
export class AppModule {}