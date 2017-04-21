/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import User from '../../models/User';
import UserHandler from './User';

export default class UsersHandler {
  users() {
    return new Promise((resolve, reject) => {
      User.find({})
        .then((products) => {
          products.map(product => new UserHandler(product._id));
          resolve(products);
        })
        .catch(err => reject(err));
    });
  }
}
