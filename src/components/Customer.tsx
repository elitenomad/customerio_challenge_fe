import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import CustomerDataService from "../services/CustomerService";
import ICustomerData from "../types/Customer";

const Customer: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCustomerState = {
    id: null,
    attributes: {},
    events: {},
    last_updated: null
  };
  const [currentCustomer, setCurrentCustomer] = useState<ICustomerData>(initialCustomerState);
  const [message, setMessage] = useState<string>("");
  const [attributeKey, setAttributeKey] = useState<string>("");
  const [attributeValue, setAttributeValue] = useState<string>("");

  const getCustomer = (id: string) => {
    CustomerDataService.get(id)
      .then((response: any) => {
        setCurrentCustomer(response?.data?.customer);
        // console.log(response.data);
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
    setCurrentCustomer(prevCustomer => ({
        ...prevCustomer,
        attributes: {...prevCustomer.attributes, [name]: value }
    }));
  };

  const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if(value === "" || value === undefined) {
      return
    }

    setAttributeKey(value)
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if(value === "" || value === undefined) {
      return
    }

    setAttributeValue(value)
  };

  const addAttribute = () => {  
    currentCustomer.attributes[attributeKey] = attributeValue
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then((response: any) => {
        setCurrentCustomer(response?.data?.customer);
        setAttributeKey("")
        setAttributeValue("")
        setMessage("The attribute is added successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then((response: any) => {
        setCurrentCustomer(response?.data?.customer);
        setMessage("The customer is updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCustomerAttribute = (name: string) => {
    CustomerDataService.removeAttribute(currentCustomer.id, name)
      .then((response: any) => {
        setCurrentCustomer(response.data.customer);
        navigate(`/customers/${currentCustomer.id}`);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className="edit-form">
          <h4>Customer Attributes</h4>
          <form className="">
            {
              Object.keys(currentCustomer.attributes).map((key, i) => (
                <div className="form-group" key={key}>
                  <label className="text-muted" htmlFor={key}><i>{key}</i></label>
                  <input
                    type="text"
                    className="form-control"
                    data-testid={key}
                    id={key}
                    name={key}
                    defaultValue={currentCustomer.attributes[key]}
                    onChange={handleInputChange}
                  />

                  <button 
                    type="button"
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => deleteCustomerAttribute(key)}
                    >
                    Delete
                  </button>
                </div>
              ))
            }
          </form>
          <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={updateCustomer}
            >
            Update
          </button>

          <hr/>
          <form className="form-inline">
            <div className="form-group mb-2">
              <label htmlFor="key" className="sr-only">Key</label>
              <input 
                type="text" 
                className="form-control" 
                id={attributeKey}
                name={attributeKey}
                value={attributeKey}
                onChange={handleKeyChange}
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label htmlFor="value" className="sr-only">Value</label>
              <input 
                type="text" 
                className="form-control" 
                id={attributeValue}
                name={attributeValue} 
                onChange={handleValueChange}
                value={attributeValue}
              />
            </div>

            <button 
              type="button" 
              className="btn btn-primary mb-2"
              onClick={addAttribute}
            >
                Add
            </button>
          </form>
          
          <p className="badge badge-success">{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Customer Not Found...</p>
        </div>
      )}
    </div>
  );
};

export default Customer;
