import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type SongCreateDto, type Song } from '../entities/song';
import {
  songCreateDtoSchema,
  songUpdateDtoSchema,
} from '../entities/song.schema.js';
import { type Repo } from '../repositories/type.repo';
import { BaseController } from './base.controller.js';
import { type Payload } from '../services/auth.services';

const debug = createDebug('W7E:songs:controller');

export class SongsController extends BaseController<Song, SongCreateDto> {
  constructor(protected readonly repo: Repo<Song, SongCreateDto>) {
    super(repo, songCreateDtoSchema, songUpdateDtoSchema);

    debug('Instantiated song controller');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    debug('Creating song');
    req.body.authorId = (req.body.payload as Payload).id;

    const { payload, ...rest } = req.body as SongCreateDto & {
      payload: Payload;
    };
    req.body = rest;

    await super.create(req, res, next);
  }
}
