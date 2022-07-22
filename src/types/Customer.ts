/*
  "customer": {
    "id": 12345,
    "attributes": {
        "created_at": "1560964022",
        "email": "example@customer.io",
        "first_name": "real",
        "ip": "127.0.0.1",
        "last_name": "customer"
    },
    "events": {
      "purchase": 1,
      "page": 3
    },
    "last_updated": 1620135856
  }
*/

interface Attributes {
  created_at?: any,
  email?: string,
  first_name?: string,
  last_name?: string,
  ip?: string
}

export default interface ICustomerData {
  id?: any | null,
  attributes?: Attributes | any,
  events?: object | any,
  last_updated?: any,
}

