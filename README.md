### React Antd Simplified

A react UI library on top of antd, for making life easier while using Ant Design.


You can install the module via npm:

 `npm install react-antd-simplified --save`


### Usage - FormItem

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
      <FormItem 
        form={form} 
        columns={2} 
        fields={fields.fieldsArr} 
      />
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
}
```
Here ```fields``` props for ```FormItem``` is an array object. 
Some examples of fields objects are as below

```
const fieldsArr = [{
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
},{
    type: 'multiselect',
    label: 'Areas of Interest',
    name: 'areasOfInterest',
    required: false,
    message: 'Please upload photo',
    values:[{label: 'Politics', value:'politics'}, { label: 'Science & Technology' , value: 'scienceAndTechnology'}]
  }]

```

Currently we support field types ``` input, number, textarea, select, multiselect, radio, checkbox, birthDate, password, upload, upload-picture, dynamicFieldSet ```; 

### You can find working example
To find more examples and field props for each field, check github repository

[live](https://codesandbox.io/s/infallible-lake-b797g?file=/src/styles.css)


### Usage - Table With Form

Table with fully functional form with edit and delete functionality.

```
import React, { Component, Fragment, useState } from "react";
import { TableWithForm } from 'react-antd-simplified';
import * as fields from '../form/fields';
import { Form } from 'antd';

const TableWithFormDemo=()=>{
  const [form] = Form.useForm();
  const [data, setdata] = useState([{fName:'Prachi',lName:'Patil',emailId:'prachi@example.com'}]);

    return(
        <div style={{width:'100%',margin:'auto', padding:'20px',marginTop:'40px'}}>
          <h2>Table with Form</h2>
          <TableWithForm
            fields={[...fields.fName, ...fields.mName, ...fields.lName, ...fields.email]}
            formColumns={4}
            checkDuplicateItem={true}
            uniqueId={'emailId'} // == this should be name of unique field being used in data 
            initialData={data}
            onChange={(data) => {
              setdata(data)
            }}
            onError={(err)=>{
              console.log(err)
            }}
            formAlign="MODAL" // ---- 'MODAL' || 'INLINE'
            showDeleteAction={true}
            showEditAction={true}
        />
        </div>
    )
}

export default TableWithFormDemo;
```
### Demo
[live](https://codesandbox.io/s/infallible-lake-b797g?file=/src/styles.css)


### Usage - DynamicFieldSet 

```
import React, { Component, Fragment, useState } from "react";
import { DynamicFieldSet } from 'react-antd-simplified';
import { Button, Form } from 'antd';

const DynamicFieldsDemo=()=>{
  const [form] = Form.useForm();


  let demoField = [
    {
        type: 'multi',
        label: 'Response',
        name: 'responseCapture',
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
            type: 'multiselect',
            label: 'Areas of Interest',
            name: 'areasOfInterest',
            required: false,
            message: 'Please upload photo',
            values:[{label: 'Politics', value:'politics'}, { label: 'Science & Technology' , value: 'scienceAndTechnology'}]
          }]
    }]


    return(
        <Form
            form={form}
            initialValues={{rememberMe:['Remember Me']}}
            onFinish={(values) => {
                console.log(values)
            }}
            onFinishFailed={(errorInfo) => {
                console.log(errorInfo)
            }}
        >
            <DynamicFieldSet
              field={demoField}
            />
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
    )
}

export default DynamicFieldsDemo;
```

### Demo
[live](https://codesandbox.io/s/infallible-lake-b797g?file=/src/styles.css)






