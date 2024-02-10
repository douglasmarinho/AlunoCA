import RepositoryInterface from "../../@shared/repository/repository-interace";
import Customer from "../entity/customer";



export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
