import assert from 'assert'
import  greetingDataBase from './db/db.js';
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL;
const db = pgPromise(connectionString);



describe('GreetData Module', function () {
   let greeting =  greetingDataBase(db)

  it('should insert and retrieve a name with counter', async function () {
   
    const name = 'John';
    const counter = 1;

    await greeting.insertName(name, counter);

    const nameCheck = await greeting.checkName(name);
    assert.deepStrictEqual(nameCheck[0].name, 'John');
    assert.deepStrictEqual(nameCheck[0].counter, 1);
  });

  it('should update the counter for an existing name', async function () {
    const name = 'Alice';

    await greeting.insertName(name, 1);
    await greeting.update(name);

    const count = await greeting.userCount(name);
    assert.deepStrictEqual(count, 2);
  });

  // Add more tests for other functions 

  after(async function () {
    // Clean up after tests by resetting the database
    await greeting.resetData();
    pgp.end();
  });
});


