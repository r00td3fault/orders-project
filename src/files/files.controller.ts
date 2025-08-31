import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers';
import type { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseUploadDto } from './dto/response-upload.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticImage(imageName);

    res.sendFile(path);
  }

  @Post('upload')
  @ApiOperation({
    summary: 'Upload image to cloud storage',
  })
  @ApiOkResponse({
    description: 'Success and return secure url',
    type: ResponseUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseUploadDto> {
    return this.filesService.uploadImage(file);
  }
}
