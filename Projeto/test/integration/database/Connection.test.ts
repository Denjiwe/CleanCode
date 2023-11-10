import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";

test("Should connect to the database", async function () {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemsData = await connection.query("select * from ccca.item", []);
  expect(itemsData).toHaveLength(6); 
});
