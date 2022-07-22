import http from "../http-common";
import ICustomerData from "../types/Customer";

const getAll = () => {
  return http.get<Array<ICustomerData>>("/customers");
};

const get = (id: any) => {
  return http.get<ICustomerData>(`/customers/${id}`);
};

const create = (data: ICustomerData | any) => {
  return http.post<ICustomerData>("/customers", data);
};

const update = (id: any, data: ICustomerData | any) => {
  return http.put<any>(`/customers/${id}`, {customer: { attributes: data?.attributes}});
};

const remove = (id: any) => {
  return http.delete<any>(`/customers/${id}`);
};

const removeAttribute = (id: any, name: string) => {
  return http.delete<any>(`/customers/${id}/attributes/${name}`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ICustomerData>>(`/customers?title=${title}`);
};

const CustomerService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
  removeAttribute
};

export default CustomerService;
