import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('HealthCheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthCheck')
  getHealthCheck(): string {
    return this.appService.healthCheck();
  }
}
