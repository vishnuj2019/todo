import { UseFormRegister } from "react-hook-form";
import { IFormInputs } from "./sampleForm1";

interface IFormInputProps {
  label: string;
  register: ReturnType<UseFormRegister<IFormInputs>>;
  message: string;
  type: string;
}

const FormInput = ({ label, register, message, type }: IFormInputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        {...register}
        className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
      />
      <p>{message}</p>
    </div>
  );
};

export default FormInput;
