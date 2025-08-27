import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({
    summary: 'Create data to test ( users and orders)',
  })
  @ApiOkResponse({
    description: 'Seed completed.',
  })
  @Get()
  async executeSeed() {
    return this.seedService.runSeed();
  }
}
