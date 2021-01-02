import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Row, Col, Upload, Checkbox, message, Select, Popconfirm } from 'antd';
// import Highlighter from 'react-highlight-words';
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomForm from '../form';
// import { layout } from '../commonImports/import1';
import moment from 'moment';


const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const TableWithForm = (props) => {
  const [searchText, setsearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('')
  const [visible, setvisible] = useState(false)
  const [data, setdata] = useState([])
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState({})
  const [selectedItem, setselectedItem] = useState(null);
  const [custForm] = Form.useForm();


  let dd = props.initialData ? props.initialData.length : 0;

  useEffect(() => {
    if (props.initialData) {
      let arr = props.initialData.map((item, i) => {
        item.key = i
        return item
      })
      setdata(arr);
    }
    // setinitial(props.dynamicData.length)

  }, [dd])



  const imagePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setpreviewImage(file.url || file.preview)
    setpreviewVisible(true)
  };



  const onFinish = (values) => {
    let arr = [...data];
    values.key = data.length;

    if (props.checkDuplicateItem && props.checkDuplicateItem == true && props.uniqueId) {
      let uniqueId = props.uniqueId;
      let flag = arr.find((a)=>a[uniqueId] == values[uniqueId]);

      if(flag){
        props.onError('DUPLICATE_ENTRY_EXCEPTION')
      }else{
        if(selectedItem == null){
          addItem(values)
        }else{
          editItem(values)
        }
      }
    } else {
      if(selectedItem == null){
        addItem(values)
      }else{
        editItem(values)
      }
    }
  }

  const addItem=(item)=>{
    let arr = [...data];
    arr.push({ ...item })
      custForm.resetFields()
      setvisible(false);
      setdata(arr)
      if(props.onChange){
        props.onChange(arr)
      }
  }


  const deleteItem = (index) => {
    let arr = [...data];
    arr.splice(index, 1)
    setdata(arr)
    setvisible(false);
    if(props.onChange){
      props.onChange(arr)
    }
  }


  const editItem = (item) => {
    let arr = [...data];
    let index = arr.find((a)=>a.key == item.key)
    if(index != -1){
      arr.splice(index, 1, item)
      setdata(arr)
      setvisible(false);
      if(props.onChange){
        props.onChange(arr)
      }
    }
    setselectedItem(null)
    custForm.resetFields()
  }

  let a = []
  let columns = props.fields.map((p) => {

    if (p.type == "datepicker") {
      return {
        title: p.label,
        dataIndex: p.name,
        key: p.name,
        // width: 150,
        render: (text) => {
          var dateString = moment(text).format("DD-MM-YYYY");
          return (
            <span>{dateString}</span>
          )
        }
      }
    }
    if (p.type == "upload") {

      return {
        title: p.label,
        dataIndex: p.name,
        key: p.name,
        // width: 150,
        render: (text) => {

          return (
            <>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                className='docmentView'
                listType="picture-card"
                defaultFileList={text && text.bucket ? [text] : text.fileList}
                onPreview={imagePreview}
                onRemove={() => {
                  return false
                }}
              />
              <Modal visible={previewVisible} footer={null} onCancel={() => {
                setpreviewVisible(false)
              }}>
                <img alt="inside page image" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </>
          )
        }
      }
    }
    return {
      title: p.label,
      dataIndex: p.name,
      key: p.name,
      // width: 150,
      render:(text,record)=>{
        return(
          <p style={{marginBottom:'0px'}}>{text ? text : '-'}</p>
        )
      }
      // ...this.getColumnSearchProps(p.name),
    }
  })


  if(props.showEditAction){
    a.push(
      {
        title: 'Edit',
        dataIndex: 'edit',
        render: (text, record) => (
            <Button 
            onClick={()=>{
              setselectedItem(record)
              setvisible(true)
              custForm.setFieldsValue({...record})
            }}><EditOutlined />
          </Button>
       ),
      }
    )
  };


  if(props.showDeleteAction){
    a.push(
      {
        title: 'Delete',
        dataIndex: 'delete',
        render: (text, record) => (
          <Popconfirm placement="topLeft" title={'Are you sure ?'} onConfirm={()=>{
            deleteItem(record.key)
          }} okText="Yes" cancelText="No">
            <Button ><DeleteOutlined />
          </Button>
        </Popconfirm>
       ),
      }
    )
  };


  let colarr = [...columns, ...a]
  return (
    <>
      <Row>
        <Col span={6} offset={18} style={{ textAlign: 'right', marginBottom: 10 }}>
          <Button 
          type="primary"
          onClick={() => {
            setvisible(true)
          }}>
            <PlusOutlined />
            Add
            </Button>
        </Col>
      </Row>

      <Table columns={colarr} dataSource={data} size="small" />
      <Modal
        title="Add Details"
        destroyOnClose
        visible={visible}
        onOk={() => {
          setvisible(false)
          setselectedItem(null)
          custForm.resetFields()
        }}
        onCancel={() => {
          // ========= DEBUG - on cancel form values are not resetting 
          setvisible(false)
          setselectedItem(null)
          custForm.resetFields()
        }}
        width={'80%'}
        footer={false}
      >
        <Form
          form={custForm}
          // {...layout}
          // initialValues={selectedItem != null ? {...selectedItem} : {}}
          onFinish={(values) => {
            onFinish(values)
          }}
          onFinishFailed={(errorInfo) => {
            console.log(errorInfo)
          }}>
          <CustomForm
            columns={3}
            fields={props.fields}
          />
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 10 }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setvisible(false)
            }}
          >
            Cancel
            </Button>

        </Form>
      </Modal>
    </>
  )

}

export default TableWithForm