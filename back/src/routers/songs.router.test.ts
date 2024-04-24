import { type SongsController } from '../controllers/songs.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { type SongsSqlRepo } from '../repositories/songs.sql.repo';
import { SongsRouter } from './songs.router';

describe('Given a instance of the class SongsRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as SongsController;
  const authInterceptor = {
    authentication: jest.fn(),
    authorization: jest.fn(),
  } as unknown as AuthInterceptor;
  const repo = {} as unknown as SongsSqlRepo;
  const router = new SongsRouter(controller, authInterceptor, repo);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(SongsRouter);
  });
});
