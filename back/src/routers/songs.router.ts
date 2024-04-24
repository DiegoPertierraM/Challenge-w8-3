import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { type SongsController } from '../controllers/songs.controller';
import { type SongsSqlRepo } from '../repositories/songs.sql.repo';

const debug = createDebug('W7E:Songs:router');

export class SongsRouter {
  router = createRouter();

  constructor(
    readonly controller: SongsController,
    readonly authInterceptor: AuthInterceptor,
    readonly songsSqlRepo: SongsSqlRepo
  ) {
    debug('Instantiated Songs router');

    this.router.get(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.getAll.bind(controller)
    );
    this.router.get(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.getById.bind(controller)
    );
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(songsSqlRepo, 'author')
        .bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(songsSqlRepo, 'author')
        .bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
