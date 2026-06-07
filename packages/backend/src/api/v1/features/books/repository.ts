import type { Pool } from 'pg';

export class BookRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  // TODO
  public test() {
    console.log(this.pool);
  }
}
