import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { CloudinaryService } from 'nestjs-cloudinary';
import { join } from 'path';
import { ResponseUploadDto } from './dto/response-upload.dto';

@Injectable()
export class FilesService {
  constructor(private readonly storageService: CloudinaryService) {}

  async uploadImage(file: Express.Multer.File): Promise<ResponseUploadDto> {
    if (!file) {
      throw new BadRequestException('the file must be an image');
    }

    try {
      const fileUploaded = await this.storageService.uploadFile(file, {
        format: 'jpg',
        use_filename_as_display_name: true,
        filename_override: file.originalname,
        use_filename: true,
        resource_type: 'image',
        overwrite: true,
        folder: 'test_upload',
      });

      return { secure_url: fileUploaded.secure_url as string };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something was worng uploading files');
    }
  }
  getStaticImage(imageName: string) {
    const path = join(__dirname, '../../static/uploads', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`${imageName} file not found`);

    return path;
  }
}
