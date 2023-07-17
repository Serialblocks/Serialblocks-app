import { TextInput, DatePicker } from "@tremor/react";
const styleWidth = {
  width: "384px",
};
const Form = () => {
  return (
    <div className=" flex flex-row gap-4">
      <div className="flex flex-col gap-4">
        <TextInput style={styleWidth} placeholder="test id" />
        <TextInput placeholder="company name" />
        <DatePicker placeholder="date" />
        <TextInput placeholder="Note something" />
      </div>
      <div className="flex flex-col gap-4">
        <TextInput style={styleWidth} placeholder="length" />
        <TextInput placeholder="diameter" />
        <TextInput placeholder="weight" />
        <TextInput placeholder="material" />
      </div>
    </div>
  );
};

export default Form;
