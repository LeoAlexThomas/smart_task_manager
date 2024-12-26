import AsyncSelect from "react-select/async";
import api from "./api";
import { UserInterface } from "@/types/user";

const CustomReactAsyncSelect = () => {
  return (
    <AsyncSelect
      loadOptions={(val: string) => api(`/user/all?searchText=${val}`).then((users: UserInterface[]) => users.map((user) => ({ value: user., label })))}
    />
  );
};
