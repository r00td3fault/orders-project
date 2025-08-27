import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor() {}
  async runSeed() {
    return `This action returns all seed`;
  }
}
