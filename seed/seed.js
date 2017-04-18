/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const faker = require('faker');
const readline = require('readline');
const schemas = require('./schemas');

mongoose.Promise = global.Promise;

function onErr(err) {
  console.error(err);
  process.exit(1);
}

process.on('unhandledRejection', (reason, p) =>
  onErr('Unhandled Rejection at: Promise', p, 'reason:', reason));

function dropDatabase() {
  return mongoose.connection.db.dropDatabase();
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsers(num) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < num; i += 1) {
      const user = { username: faker.name.firstName(), password: 'test', fullname: faker.name.findName() };
      promises.push(schemas.User.create(user));
    }
    promises.push(schemas.User.create({ username: 'demo', password: 'demo', fullname: 'demo' }));
    Promise.all(promises)
      .then((users) => {
        const userIDs = users.map(user => user._id);
        resolve(userIDs);
      })
      .catch(err => reject(err));
  });
}

function generateProducts(num) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < num; i += 1) {
      const product = { name: faker.commerce.productName() };
      promises.push(schemas.Product.create(product));
    }
    Promise.all(promises)
      .then((products) => {
        const productIDs = products.map(product => product._id);
        resolve(productIDs);
      })
      .catch(err => reject(err));
  });
}

function generateConsumers(num) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < num; i += 1) {
      const consumer = {
        name: faker.name.findName(),
        products: [],
      };
      promises.push(schemas.Consumer.create(consumer));
    }
    Promise.all(promises)
      .then((consumers) => {
        const consumerIDs = consumers.map(consumer => consumer._id);
        resolve(consumerIDs);
      })
      .catch(err => reject(err));
  });
}

function addProductsToConsumers(pids, cids) {
  return new Promise((resolve, reject) => {
    const promises = [];
    // For simplicity's sake, add every product to every consumer
    // to guarantee there are no consumerless products or productless consumers
    for (let i = 0; i < pids.length; i += 1) {
      for (let j = 0; j < cids.length; j += 1) {
        const promise = schemas
          .Consumer
          .findByIdAndUpdate(cids[j], { $push: { products: pids[i] } });
        promises.push(promise);
      }
    }
    Promise.all(promises).then(results => resolve(results))
      .catch(err => reject(err));
  });
}

function generateTicket(owner, consumer, product) {
  return new Promise((resolve, reject) => {
    const ticket = {
      description: faker.lorem.paragraph(),
      product,
      consumer,
      owner,
      created: Date.now() - 100000,
      closed: Date.now(),
      priority: Math.floor(Math.random() * 5) + 1,
      comments: [],
    };
    schemas.Ticket.create(ticket)
      .then(t => resolve(t))
      .catch(err => reject(err));
  });
}

function createTickets(uids, pids, cids, num) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < num; i += 1) {
      const user = randomElement(uids);
      const product = randomElement(pids);
      const consumer = randomElement(cids);
      promises.push(generateTicket(user, consumer, product));
    }
    Promise.all(promises)
      .then((tickets) => {
        const ticketIDs = tickets.map(ticket => ticket._id);
        resolve(ticketIDs);
      })
      .catch(err => reject(err));
  });
}

function createComments(uids, tids, num) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < num; i += 1) {
      const user = randomElement(uids);
      const ticket = randomElement(tids);
      const comment = {
        owner: user,
        created: Date.now(),
        description: faker.lorem.paragraph(),
      };
      const promise = schemas
        .Comment
        .create(comment)
        .then((c) => {
          schemas.Ticket.findByIdAndUpdate(ticket, { $push: { comments: c._id } })
            .then(() => resolve(c))
            .catch(err => reject(err));
        });
      promises.push(promise);
    }
    Promise.all(promises)
      .then(results => resolve(results))
      .catch(err => reject(err));
  });
}

function seed() {
  mongoose.connect('mongodb://localhost/condictor', (err) => {
    if (err) return onErr(err);
    dropDatabase().then(() => {
      console.log('db dropped');
      generateUsers(3).then((uids) => {
        console.log('users created');
        generateProducts(5).then((pids) => {
          console.log('products created');
          generateConsumers(3).then((cids) => {
            console.log('consumers created');
            addProductsToConsumers(pids, cids).then(() => {
              console.log('products added to consumers');
              createTickets(uids, pids, cids, 5).then((tids) => {
                console.log('tickets created');
                createComments(uids, tids, 10).then(() => {
                  console.log('New data seeded in database.');
                  mongoose.disconnect();
                });
              });
            });
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
      mongoose.disconnect();
      process.exit(1);
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Running this script will DESTROY existing data. Type "yes" to continue.', (answer) => {
  rl.close();
  if (answer === 'yes') seed();
  else {
    console.log('Aborting.');
    process.exit(0);
  }
});
