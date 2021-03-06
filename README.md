# condictor

A Thinkful Fullstack Capstone Project
by [Grayson Gilmore](https://github.com/gilmoreg/).

[See the live site here](http://condictor.gilmoreg.com/).

## Screenshots
![condictor-montage](https://cloud.githubusercontent.com/assets/18176333/26330669/b2e90af6-3f12-11e7-96a3-b5349ef61d8f.png)

## Summary
Condictor is a lightweight helpdesk issue tracker. It allows you to create tickets that track issues reported by consumers for your supported products. Users can add comments and close tickets. The demo version comes with prefilled test data (a set of consumers, products, users, and tickets).

## Technical
* This is a full stack web app.
* The server side uses Node, Express, MongoDB, Passport and GraphQL.
    * API endpoints are tested with Jest, chai, and supertest.
    * Authentiction is session-based and persistence stored.
    * Passwords are encrypted with bcrypt.
    * The GraphQL implementation uses the buildSchema approach with classes as resolvers.
* The browser side uses React and Redux.
    * Client side was built using [create-react-app](https://github.com/facebookincubator/create-react-app).
    * GraphQL calls use [Lokka](https://github.com/kadirahq/lokka) and [LokkaTransportHttp](https://github.com/kadirahq/lokka-transport-http).
    * React components tested with [enzyme](https://github.com/airbnb/enzyme).
    * Dates formatted with [moment](https://momentjs.com/).

## Build/run instructions:

Condictor requires a deployed instance of [condictor-backend](https://github.com/gilmoreg/condictor-backend).

The demo has one running in a Docker image on Heroku.

```
# In project root
npm install
npm start
```

## To run tests:
```
# In project root
npm test
```

## Development Roadmap
* Pagination and sorting for ticket lists
* Support for editing tickets (assigning to different users or switching products, for example)
* Statistics (number of tickets per user, average open time, etc.)

