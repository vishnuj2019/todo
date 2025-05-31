import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export interface IFormTypes {
  username: string;
  email: string;
  channal: string;
  address: {
    city: string;
  };
  phoneNumbers: string[];
  phone_numbers: {
    number: string;
  }[];
}
const SampleForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormTypes>({
    defaultValues: {
      username: "",
      address: {
        city: "",
      },
      channal: "",
      email: "",
      phoneNumbers: ["", ""],
      phone_numbers: [{ number: "" }],
    },
  });

  const {
    fields: PhoneFields,
    append,
    remove,
  } = useFieldArray({
    name: "phone_numbers",
    control,
  });

  const onSubmit = (data: IFormTypes) => {
    console.log("Form Submitted", data);
  };
  return (
    <div className="w-1/3">
      <h1>Form without Child input</h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  flex flex-col gap-y-2 p-5 rounded-md mx-auto "
      >
        <label>Enter your name</label>
        <input
          placeholder="Enter Name"
          type="text"
          {...register("username", { required: "Username is required" })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.username?.message}</p>

        <input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            validate: {
              notAdmin: (value) => {
                if (value === "vishnu@gmail.com") {
                  return "Try another one";
                }
                return true;
              },
              notBlacklisted: (fieldValue) => {
                return (
                  !fieldValue.includes("@blocked.com") ||
                  "Your email is blocked"
                );
              },
            },
          })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.email?.message}</p>

        <input
          placeholder="channal"
          type="text"
          {...register("channal", { required: "Channel is required" })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.channal?.message}</p>

        <input
          placeholder="city"
          type="text"
          {...register("address.city", { required: "City is required" })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.address?.city?.message}</p>

        <input
          placeholder="Personal Number"
          type="text"
          {...register("phoneNumbers.0", {
            required: "Personal Number is required",
          })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.phoneNumbers! && errors.phoneNumbers![0]?.message}</p>
        <input
          placeholder="Primary Number"
          type="text"
          {...register("phoneNumbers.1", {
            required: "Primary Number is required",
          })}
          className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
        />
        <p>{errors.phoneNumbers! && errors.phoneNumbers![1]?.message}</p>

        <label>Phone Number Fields</label>
        {PhoneFields?.map((field, index) => (
          <div key={field.id}>
            <input
              placeholder="Primary Number"
              type="text"
              {...register(`phone_numbers.${index}.number`)}
              className="focus:outline-none w-full border p-2 text-sm rounded-md border-gray-500"
            />
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ number: "" })}>
          Add
        </button>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SampleForm;
