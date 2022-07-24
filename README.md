# CUSTOMER IO - FE

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Set port
.env
```
PORT=8081
```

## Project setup

In the project directory, you can run:

```
npm install
```

or

### Compiles and hot-reloads for development

```
npm start
```

### To run tests

```
npm run test
```

### Decisions
  - Tested limited set of features for each component
    - App
    - CustomerList
    - Customer
  - Improvement is to use Cypress and write a Feature specs to cover user flows
  - Used simple React state hooks to hold the state. 
  - Cachig is ignored and refreshing the page will call the API endpoints.

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
