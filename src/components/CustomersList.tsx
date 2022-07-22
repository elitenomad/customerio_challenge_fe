import React, { useState, useEffect } from "react";
import CustomerDataService from "../services/CustomerService";
import { Link } from "react-router-dom";
import ICustomerData from '../types/Customer';

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Array<ICustomerData>>([]);
  const [currentCustomer, setCurrentCustomer] = useState<ICustomerData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const retrieveCustomers = () => {
    CustomerDataService.getAll()
      .then((response: any) => {
        setCustomers(response.data.customers);
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

  return (
    <div className="list row">
      <div className="col-md-8">
        <h5>
          Customers List&nbsp;

          <button
              onClick={refreshList}
              className="btn btn-outline-secondary btn-sm"
            >
              Refresh
          </button>
        </h5>

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
      </div>
      <div className="col-md-4">
        {currentCustomer ? (
          <div>
            <h5>
              Attributes &nbsp;
              <Link
                to={"/customers/" + currentCustomer.id}
                className="btn btn-primary btn-sm"
              >
                Edit
            </Link>
            </h5>
            
            <table className="table table-striped">
              <tbody>
                {
                  Object.keys(currentCustomer.attributes).map((key, i) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{currentCustomer.attributes[key]}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <h5>Events</h5>
            <table className="table table-striped">
              <tbody>
                {
                Object.keys(currentCustomer.events).map((key, i) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{currentCustomer.events[key]}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
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
