import { type NextFunction, type Request, type Response } from 'express';
import { v2 } from 'cloudinary';
import createDebug from 'debug';
import multer from 'multer';
import { HttpError } from './errors.middleware';

const debug = createDebug('W7E:files:interceptor');

export class FilesInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  singleFile(fieldName = 'avatar') {
    const storage = multer.diskStorage({
      destination: 'uploads/',
      filename(_req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
      },
    });

    const upload = multer({ storage });
    const middleware = upload.single(fieldName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previousBody = req.body as Record<string, unknown>;
      middleware(req, res, next);
      req.body = { ...previousBody, ...req.body } as unknown;
    };
  }

  //
  //  async cloudinaryUpload(req: Request, res: Response, next: NextFunction) {
  //   const options = {
  //     folder: 'bc2021_1',
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     use_filename: true,
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     unique_filename: false,
  //     overwrite: true,
  //   };

  //   if (!req.file) {
  //     next(new HttpError(400, 'Bad Request', 'No file uploaded'));
  //     return;
  //   }

  //   const finalPath = req.file.destination + '/' + req.file.filename;

  //   try {
  //     const result = await v2.uploader.upload(finalPath, options);
  //     console.log(result);
  //   } catch (error) {
  //     next(
  //       new HttpError(500, 'Internal server error', (error as Error).message)
  //     );
  //   }
  // }
}
