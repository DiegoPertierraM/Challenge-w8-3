import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { UsersRouter } from './routers/users.router.js';
import { SongsController } from './controllers/songs.controller.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { SongsSqlRepo } from './repositories/songs.sql.repo.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { UsersController } from './controllers/users.controller.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { FilesController } from './controllers/files.controller.js';
import { FilesRouter } from './routers/files.router.js';
import { FilesInterceptor } from './middleware/files.interceptor.js';
import { SongsRouter } from './routers/songs.router.js';

const debug = createDebug('W7E:app');
export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const authInterceptor = new AuthInterceptor();
  const filesInterceptor = new FilesInterceptor();

  // Prev const songsRepo = new songsFsRepo();
  const songsRepo = new SongsSqlRepo(prisma);
  const songsController = new SongsController(songsRepo);
  const songsRouter = new SongsRouter(
    songsController,
    authInterceptor,
    songsRepo
  );
  app.use('/songs', songsRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(
    usersController,
    authInterceptor,
    filesInterceptor
  );
  app.use('/users', usersRouter.router);

  const filesController = new FilesController();
  const filesRouter = new FilesRouter(filesController, filesInterceptor);

  app.use('/files', filesRouter.router);
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
