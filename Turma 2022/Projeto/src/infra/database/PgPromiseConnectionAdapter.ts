import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any;
  static instance: PgPromiseConnectionAdapter;

  private constructor() {
    this.pgp = pgp()("postgresql://postgres:12345678@localhost:5432/postgres");
  }

  static getInstance() {
    if(!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }
    return PgPromiseConnectionAdapter.instance;
  }

  query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}