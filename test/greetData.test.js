import assert from 'assert'
import greetingDataBase from '../db/db.js';
import pgPromise from 'pg-promise';
import { log } from 'console';

const connectionString = process.env.DATABASE_URL || "postgresql://codex:xcode123@localhost:5432/greettable";

const db = pgPromise()(connectionString);

describe('GreetData Module', function () {
  this.timeout(20000)

  beforeEach(async function () {
    await db.none('DELETE FROM greettable')

  })

  let greeting = greetingDataBase(db)


  it('should insert and retrieve a name with counter', async function () {

    const name = 'John';
    const counter = 1;

    await greeting.insertName(name);

    const nameCheck = await greeting.checkName(name);
    assert.deepEqual(nameCheck.name, 'John');
    
  });

  it('should update the counter for an existing name', async function () {
    const name = 'Alice';

    await greeting.insertName(name, 1);
    await greeting.update(name);

    const counter = await greeting.userCount(name);
    assert.deepEqual(counter, 2);
  });

  it("should return the number of times a user has been greeted", async function () {

    await greeting.insertName('Asisipho')
    await greeting.update('Asisipho')

    let results = await greeting.userCount('Asisipho')

    assert.deepEqual(results, 2)
  })

  it("should clear the database", async function () {
   

    await greeting.insertName('Asisipho')
    await greeting.update('Asisipho')

    let results = await greeting.userCount('Asisipho')

    assert.deepEqual(results, 2)
    
    results = await greeting.resetData()

    const clearResults = await greeting.insertName();

    assert.equal(clearResults, results)
    
  })

  after(async function () {
    // Clean up after tests by resetting the database
    await greeting.resetData();
    db.$pool.end();
  });
});


