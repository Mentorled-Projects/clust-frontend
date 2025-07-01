import { atom, useAtom } from "jotai";
import { SignUpType } from "./type";

export const signUpStateStore = atom<SignUpType>({
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_verify: "",
});

export const useSignUpState = () => {
  const [signUpState, setSignUpState] = useAtom(signUpStateStore);

  return {
    signUpState,
    setSignUpState,
  };
};
