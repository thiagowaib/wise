import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: async () => {
        const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
        return drizzle(client);
      },
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}
