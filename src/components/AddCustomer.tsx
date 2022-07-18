import React, { useState, ChangeEvent } from "react";
import CustomerDataService from "../services/CustomerService";
import ICustomerData from '../types/Customer';

const AddCustomer: React.FC = () => {
  const initialCustomerState = {
    id: null,
    attributes: {},
    events: {},
    last_updated: null
  };
  const [customer, setCustomer] = useState<ICustomerData>(initialCustomerState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      email: customer.attributes.email,
      first_name: customer.attributes.first_name
    };

    CustomerDataService.create(data)
      .then((response: any) => {
        setCustomer(response.data);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={customer.attributes.email}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={customer.attributes.first_name}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveCustomer} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
