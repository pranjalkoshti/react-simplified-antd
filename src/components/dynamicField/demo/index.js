import React, { Component, Fragment, useState } from "react";
import DynamicFieldSet from '../index';
import * as fields from '../../form/demo/fields';
import { Button, Form } from 'antd';

const DynamicFieldsDemo=()=>{
  const [form] = Form.useForm();
  const [data, setdata] = useState([{fName:'abc',lName:'ab',emailId:'abc'}]);

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
            //----------usual initial values for form 
            initialValues={{rememberMe:['Remember Me']}}
            onFinish={(values) => {
                //-----------get values on form submit
                console.log(values)
            }}
            onFinishFailed={(errorInfo) => {
                //-----------error log on failed submission
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