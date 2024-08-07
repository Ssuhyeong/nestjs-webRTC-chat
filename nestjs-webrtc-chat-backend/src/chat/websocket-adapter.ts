import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CorsOptions } from 'cors';
import { Server, ServerOptions } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
  constructor(
    appOrHttpServer: INestApplicationContext,
    private readonly corsOptions: CorsOptions,
  ) {
    super(appOrHttpServer);
  }

  create(port: number, options?: ServerOptions): Server {
    return super.create(port, {
      ...options,
      cors: this.corsOptions,
    });
  }
}
