import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Song, type SongCreateDto } from '../entities/song.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('W7E:songs:repository:sql');

const select = {
  id: true,
  title: true,
  author: {
    select: {
      avatar: true,
      name: true,
      email: true,
      birthDate: true,
      role: true,
    },
  },
  year: true,
};

export class SongsSqlRepo implements Repo<Song, SongCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated songs sql repository');
  }

  async readAll() {
    const songs = await this.prisma.song.findMany({
      select,
    });
    return songs;
  }

  async readById(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      select,
    });

    if (!song) {
      throw new HttpError(404, 'Not Found', `song ${id} not found`);
    }

    return song;
  }

  async create(data: SongCreateDto) {
    return this.prisma.song.create({
      data: {
        year: data.year ?? 0,
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<SongCreateDto>) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      select,
    });
    if (!song) {
      throw new HttpError(404, 'Not Found', `song ${id} not found`);
    }

    return this.prisma.song.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      select,
    });
    if (!song) {
      throw new HttpError(404, 'Not Found', `song ${id} not found`);
    }

    return this.prisma.song.delete({
      where: { id },
      select,
    });
  }
}
