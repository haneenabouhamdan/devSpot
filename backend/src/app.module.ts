import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {
  User,
  Role,
  Permission,
  Message,
  MessageReaction,
  PinnedMessage,
  Submission,
  Review,
  SubmissionReview,
  UserModule,
  ChannelModule,
  Challenge,
  ChallengeModule,
  Channel,
  UserChannels,
  MessageModule,
  SubmissionModule,
} from './components';
import { AuthGuard } from './auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [
        User,
        Channel,
        UserChannels,
        Role,
        Permission,
        Message,
        MessageReaction,
        PinnedMessage,
        Challenge,
        Submission,
        Review,
        SubmissionReview,
      ],
      database: 'dev_spot',
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    AppConfigModule,
    UserModule,
    AuthModule,
    ChannelModule,
    MessageModule,
    ChallengeModule,
    SubmissionModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    JwtService,
  ],
})
export class AppModule {}
