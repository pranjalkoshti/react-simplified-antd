
export { 
    fName,
    mName,
    lName,
    email,
    fieldsArr,
    fieldsBirthDate,
    areasOfInterests
}
const genderValues = ['MALE', 'FEMALE', 'OTHER'];


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


const uploadPhoto1 = [{
  type: 'upload',
  label: 'Photo',
  name: 'photo',
  required: false,
  limit:2,
  message: 'Please upload photo'
}]


const uploadPhoto = [{
  type: 'upload-picture',
  label: 'Photo',
  name: 'photo',
  placeholder: 'Photo',
  required: false,
  limit:1,
  message: 'Please upload photo'
}];

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
  
  const mName = [{
    type: 'input',
    label: 'Middle Name',
    name: 'mName',
    required: false,
    placeholder: 'Middle Name',
    message: 'Please input middle name',
    custValidation: [{
      validator: "^[a-zA-Z ]+$",
      message: 'Please enter valid name',
      type: 'regx',
    }]
  }]
  
  const lName = [{
    type: 'input',
    label: 'Last Name',
    name: 'lName',
    required: true,
    placeholder: 'Last Name',
    message: 'Please input last name',
    custValidation: [{
      validator: "^[a-zA-Z ]+$",
      message: 'Please enter valid name',
      type: 'regx',
    }]
  }]

  const email = [{
    type: 'input',
    label: "Email Id",
    name: 'emailId',
    placeholder: 'Email Id',
    required: true,
    message: 'Please input email-id',
    custValidation: [{
      validator: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter valid Email address',
      type: 'regx',
    }]
  }]

  const gender = [
    {
      type: 'radio',
      label: 'Gender',
      name: 'gender',
      required: false,
      message: 'Please select gender',
      values: genderValues,
    }]

    const rememberMe = [
      {
          type:'checkbox',
          label: 'Remember Me',
          name:'rememberMe',
          required:false,
          showlabel:false,
          message:'Please input ',
          values:['Remember Me'],
          custValidation:[{
            
          }]
        }
    ]

    const fieldsBirthDate = [
      {
        type: 'birthDate',
        label: 'Birth Date',
        name: 'birthDate',
        required: false,
        message: 'Please input date of birth',
        custValidation: [{
    
        }]
      }]

      const password = [{
        type: 'password',
        label: 'Password',
        name: 'password',
        required: true,
        placeholder: 'Password',
        message: 'Please input Password',
        // custValidation: [{
        //   validator: "^[a-zA-Z0-9]+$",
        //   message: 'Please enter valid password',
        //   type: 'regx',
        // }]
      }]
  const fieldsArr = [ ...uploadPhoto,...uploadPhoto1,  ...fName, ...mName, ...lName, ...email, ...gender, ...fieldsBirthDate, ...areasOfInterests, ...password, ...documents, ...rememberMe];
