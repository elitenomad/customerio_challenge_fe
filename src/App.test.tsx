import {shallow} from "enzyme"
import { Link } from "react-router-dom"
import App from "./App"

describe("App", () => {
  const wrapper = shallow(<App />)

  test("renders Logo Text", () => {
    expect(wrapper.text()).toContain("Customer.IO")
  })

  test("renders Link with text Customers", () => {
    expect(wrapper.find(Link).text()).toContain("Customers")
    expect(wrapper.find(Link).exists()).toBeTruthy()
  })

  test("renders Link that redirects to /customers", () => {
    expect(wrapper.find(Link).props()["to"]).toEqual("/customers")
  })
})