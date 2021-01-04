### React Antd Simplified

A react UI library on top of antd, for making life easier while using Ant Design;


You can install the module via npm:

 `npm install react-antd-simplified --save`


### Usage 

```
import React from "react";
import * as fields from "./fields";
import { Button, Form } from "antd";
import { FormItem } from "react-antd-simplified";

export default function App() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{ rememberMe: ["Remember Me"] }}
      onFinish={(values) => {
        console.log(values);
      }}
      onFinishFailed={(errorInfo) => {
        console.log(errorInfo);
      }}
    >
      <h2>User Registration</h2>
      {/* fields props is an array of object */}
      <FormItem form={form} columns={2} fields={fields.fieldsArr} />
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
}
```

Where fields objects some examples are as below

```
const fName = [{
    type: 'input',
    label: 'First Name',
    name: 'fName',
    required: true,
    placeholder: 'First Name',
    message: 'Please input first name',
    custValidation: [{
      validator: "^[a-zA-Z ]+$",
      message: 'Please enter valid name',
      type: 'regx',
    }]
}]

let documents = [
  {
      type: 'dynamicFieldSet',
      label: 'Document',
      name: 'documents',
      showlabel: true,
      fields:[{
          type: 'input',
          label: 'Name',
          name: 'name',
          required: true,
          placeholder: 'Name',
          message: 'Please input name',
          custValidation: [{
            validator: "^[a-zA-Z ]+$",
            message: 'Please enter valid name',
            type: 'regx',
          }]
        },
        {
          type: 'upload-picture',
          label: 'Upload',
          name: 'upload',
          required: true,
          limit:1,
          message: 'Please upload document'
        }]
  }]

  const areasOfInterests = [{
      type: 'multiselect',
      label: 'Areas of Interest',
      name: 'areasOfInterest',
      required: false,
      message: 'Please upload photo',
      values:[{label: 'Politics', value:'politics'}, { label: 'Science & Technology' , value: 'scienceAndTechnology'}]
    }]

```

### You can find working example and field props for each field here, also find more examples in github repository
[live](https://codesandbox.io/s/infallible-lake-b797g?file=/src/styles.css)
