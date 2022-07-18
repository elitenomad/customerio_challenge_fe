import React, { useState, useEffect, ChangeEvent } from "react";
import CustomerDataService from "../services/CustomerService";
import { Link } from "react-router-dom";
import ICustomerData from '../types/Customer';

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Array<ICustomerData>>([]);
  const [currentCustomer, setCurrentCustomer] = useState<ICustomerData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCustomers = () => {
    CustomerDataService.getAll()
      .then((response: any) => {
        setCustomers(response.data.customers);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomer(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (customer: ICustomerData, index: number) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    CustomerDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    CustomerDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setCustomers(response.data);
        setCurrentCustomer(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Customers List</h4>

        <ul className="list-group">
          {customers &&
            customers.map((customer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCustomer(customer, index)}
                key={index}
              >
                {customer?.attributes?.email}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCustomers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCustomer ? (
          <div>
            <h4>Customer</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCustomer?.attributes?.email}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCustomer?.attributes?.first_name}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCustomer?.attributes?.ip}
            </div>

            <Link
              to={"/customers/" + currentCustomer.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
