import React, { Component } from 'react';
import CustomForm from '../../components/form';
import * as fields from './fields';
import { Button, Form, Card } from 'antd'

const BasicRegistrationForm=()=>{
    const [form] = Form.useForm();
    return(
        <Card>
            <Form
            form={form}
            //usual initial values for form 
            initialValues={{rememberMe:['Remember Me']}}
            onFinish={(values) => {
                //get values on form submit
                console.log(values)
            }}
            onFinishFailed={(errorInfo) => {
                //error log on failed submission
                console.log(errorInfo)
            }}
            >
                <h2>User Registration</h2>
                {/* fields props is an array of objects */}
                <CustomForm
                    form={form}
                    columns={2}
                    fields={fields.fieldsArr}
                />
                <Button type="primary" htmlType="submit">Register</Button>
            </Form>
        </Card>
    )
}

export default BasicRegistrationForm;