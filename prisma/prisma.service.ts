import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    const clientAsAny = this as unknown as { $on: (event: string, cb: () => Promise<void>) => void };
    clientAsAny.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
