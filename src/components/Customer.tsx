import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import CustomerDataService from "../services/CustomerService";
import ICustomerData from "../types/Customer";

const Customer: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCustomerState = {
    id: null,
    attributes: {},
    events: {},
    last_updated: null
  };
  const [currentCustomer, setCurrentCustomer] = useState<ICustomerData>(initialCustomerState);
  const [message, setMessage] = useState<string>("");

  const getCustomer = (id: string) => {
    CustomerDataService.get(id)
      .then((response: any) => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCustomer(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentCustomer.id
    };

    CustomerDataService.update(currentCustomer.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentCustomer({ ...currentCustomer});
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The customer was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    CustomerDataService.remove(currentCustomer.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/customers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className="edit-form">
          <h4>Customer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCustomer.attributes.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCustomer.attributes.first_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.attributes.ip}
            </div>
          </form>

          {currentCustomer.attributes.ip ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteCustomer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}
    </div>
  );
};

export default Customer;
