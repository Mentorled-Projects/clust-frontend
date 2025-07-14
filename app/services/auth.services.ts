import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

//*****signup service ***** */
interface regData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}
export const registerNewUser = async (formData: any) => {

};
