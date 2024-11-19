import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private static client: RedisClientType;

  constructor() {
    if (!RedisService.client) {
      RedisService.client = createClient({
        url: 'redis://localhost:6379',
      });

      RedisService.client.on('error', (err) => {
        console.error('Redis error:', err);
      });
    }
  }

  async onModuleInit() {
    if (!RedisService.client.isOpen) {
      await RedisService.client.connect();
      console.log('Connected to Redis');
    }
  }

  async onModuleDestroy() {
    if (RedisService.client.isOpen) {
      await RedisService.client.disconnect();
    }
  }

  async set(key: string, value: any): Promise<void> {
    await RedisService.client.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<string | null> {
    return RedisService.client.get(key);
  }

  async del(key: string): Promise<number> {
    return RedisService.client.del(key);
  }

  getClient(): RedisClientType {
    return RedisService.client;
  }
}
