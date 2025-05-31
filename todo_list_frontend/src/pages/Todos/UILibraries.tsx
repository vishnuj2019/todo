import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
//import Input from "@material-ui/core/Input";

const UILibraries = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
    },
  });

  const [date, setDate] = useState(null);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="date"
        rules={{
          required: "Date is Required",
        }}
        render={({ field }) => {
          return (
            <DatePicker
              ref={field.ref}
              name={field.name}
              value={field?.value ? dayjs(field?.value) : null}
              onChange={(data) => {
                field.onChange(data ? data.valueOf() : null);
              }}
            ></DatePicker>
          );
        }}
      />
      {errors?.date?.message}
      <input type="submit" />
    </form>
  );
};

export default UILibraries;
