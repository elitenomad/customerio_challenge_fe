import React from "react";
import CustomerList from "./CustomersList";
import CustomerService from "../services/CustomerService";
import { waitFor, screen, fireEvent, render,within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const customers = {
  data: {
    customers: [
      {
          "id": 2,
          "attributes": {
              "city": "Elisetown",
              "created_at": "1549317440",
              "email": "andreannebaumbach@homenick.biz",
              "first_name": "Domingo",
              "ip": "77.62.224.247",
              "last_name": "Pollich",
              "porschemelany": "SpecialistCorkery",
              "saabmyrtle": "CoordinatorLegros",
              "timestamp": "1560981440"
          },
          "events": {
              "calculatesilver": 8,
              "generatemintcream": 13,
              "quantifydarkgray": 4,
              "quantifydarkseagreen": 4,
              "synthesizeivory": 5
          },
          "last_updated": 1560981440
      },
      {
          "id": 5,
          "attributes": {
              "benzdestinee": "ExecutiveRoberts",
              "city": "Vanessaborough",
              "created_at": "1549317440",
              "email": "brianweissnat@bruen.name",
              "farboudjerry": "TechnicianDickinson",
              "first_name": "Mckayla",
              "ip": "19.201.55.237",
              "last_name": "Gulgowski",
              "timestamp": "1560981440"
          },
          "events": {
              "backupmediumturquoise": 6,
              "bypassdarkseagreen": 4,
              "connectsienna": 8,
              "copylightgoldenrodyellow": 2,
              "navigatemediumblue": 6
          },
          "last_updated": 1560981440
      }
    ]
  }
}

describe("fetches data, then render customers email on the page", () => {
  beforeEach(() => {
    jest.spyOn(
      CustomerService, 'getAll'
    ).mockImplementation(() => Promise.resolve<any>(customers));
  })

  it("should display customers by attribute email", async () => {
    render(<CustomerList />)

    await waitFor(() => {
      expect(screen.getByText(customers.data.customers[0].attributes.email)).toBeInTheDocument();      
      expect(screen.getByText(customers.data.customers[1].attributes.email)).toBeInTheDocument();
    })

    await waitFor(() => {
      const list = screen.getByRole("list", { name: /customers/i })
      const { getAllByRole } = within(list)
      const customers = getAllByRole("listitem")
      expect(customers.length).toBe(2)
    })
  });

  test("is expected to hint user to select a customer with right text", async () => {
    render(<CustomerList />);

    await waitFor(() => {
      expect(screen.getByText("Please click on a Customer...")).toBeInTheDocument();      
    })
  })

  test("is expected to show customer info when one of the email is selected", async () => {
    // Was complanining about LinkTo usage.
    // https://heygabriel.medium.com/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-component-de3109b8b711
    render(<BrowserRouter><CustomerList /></BrowserRouter>);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText(customers.data.customers[0].attributes.email));
      Object.keys(customers.data.customers[0].attributes).map((key, i) => (
          expect(screen.getByText(key)).toBeInTheDocument() 
      ));
    })   
  })

  test("is expected to have Edit button to change to edit screen", async () => {
    render(<BrowserRouter><CustomerList /></BrowserRouter>);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText(customers.data.customers[0].attributes.email));
      expect(screen.getByText('Edit')).toBeInTheDocument() 
    })   
  })
});