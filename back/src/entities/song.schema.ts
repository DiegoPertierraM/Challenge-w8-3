import Joi from 'joi';
import { type SongCreateDto } from './song';

export const songCreateDtoSchema = Joi.object<SongCreateDto>({
  title: Joi.string().required(),
  authorId: Joi.string().required(),
  year: Joi.number(),
});

export const songUpdateDtoSchema = Joi.object<SongCreateDto>({
  title: Joi.string(),
  authorId: Joi.string(),
  year: Joi.number(),
});
