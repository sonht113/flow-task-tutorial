import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer-option';

@Controller()
export class UploadController {
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('file', 1, multerOptions))
  upload(@UploadedFiles() file) {
    console.log(file);
    return file;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
