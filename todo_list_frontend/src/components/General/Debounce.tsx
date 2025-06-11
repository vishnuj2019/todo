export const debounce = (fun: any, delay: number) => {
  let id: number;
  console.log("outside return ");
  return (...data: any) => {
    console.log("before timeout", ...data);
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      console.log("after timeout", ...data);
      fun(...data);
    }, delay);
  };
};
