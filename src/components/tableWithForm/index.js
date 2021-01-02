import React, { FC} from 'react';
import { Table, Input, Button, Modal, Form, Row, Col ,Upload ,Checkbox ,message ,Select} from 'antd';
// import Highlighter from 'react-highlight-words';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import CustomForm from '../form';
import validateFields, { FormProps } from 'antd/lib/form'
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


  
  
class TableWithForm extends React.Component {
    searchInput;

    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            searchedColumn: '',
            visible:false,
            data:[],
            // data:this.props.dynamicData!=null &&this.props.dynamicData.length>0 ?this.props.dynamicData:[],
            previewVisible:false,
            previewImage:{},
            initial:false,
          };
    }

    // static getDerivedStateFromProps(props, state){
    //   // console.log('getDerivedStateFromProps',props)
    //   let dynamicdocData=[]
    //   let dynamicrefData=[]
    //   // console.log('props.dynamicDocData',props.dynamicData,props.dynamicrefData!=null && props.dynamicrefData!=undefined && props.dynamicData.name=='refDocInfo' && props.dynamicData.value &&  props.dynamicData.value.length>0)
    //   if(props.dynamicData!=null && props.dynamicData!=undefined&&props.dynamicData.name=='docDetails'&& props.dynamicData.value && props.dynamicData.value.length>0){
    //     props.dynamicData.value.map((a,i)=>{
    //       // console.log('in',a)
    //       // delete a['__typename']
    //       a['key']=i
    //       let fileList: any = a.doc == null ? [] : [{
    //             key:a.doc.key,
    //             uid: a.doc.key,
    //             name: a.doc.key,
    //             status: 'done',
    //             bucket: a.doc.bucket,
    //             region: a.doc.region,
    //             url:`https://s3.${a.doc.region}.amazonaws.com/${a.doc.bucket}/${a.doc.key}`
    //         }]
    //           let list={
    //             fileList: fileList
    //           }
    //           a['doc']=list
    //           // console.log('a',a)
    //           dynamicdocData.push(a)
    //     })
    //     // console.log('dynamicrefData',a)

    //     return{
    //             data:dynamicdocData,
    //             initial:true
    //           }
    //   }
    //   if(props.dynamicData!=null && props.dynamicData!=undefined && props.dynamicData.name=='refDocInfo' && props.dynamicData.value &&  props.dynamicData.value.length>0){
    //     // console.log('refDocInfo',props.dynamicData)
    //     // props.dynamicData.value && props.dynamicData.value.length>0 &&
    //     props.dynamicData.value.map((a,i)=>{
    //       delete a['__typename']
         
    //       dynamicrefData.push(a)
    //       // console.log('dynamicrefData in ----',a)
    //     })

    //     return{
    //             data:dynamicrefData,
    //             initial:true
    //           }
    //   }
        
    // }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[this.state.searchText]}
        //   autoEscape
        //   textToHighlight={text.toString()}
        // />
        <p>{text.toString()}</p>
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  showModal = () => {
    this.setState({
      visible: true,
    });
  };
 
  handleOk = () => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onFinish = (values, setdynamicData, name ,form) => {
    console.log('form',values,this.state.data)
    // let form=this.props.form
    let data = [...this.state.data];
    values.key = data.length;
    
    
    data.push({...values})
    console.log('daat',data)
    this.handleOk()
    // form.resetFields()

    try{
        setdynamicData(data,name)
        // message.success(`${name=='docDetails' ? 'Document Added Successfully':name=='refDocInfo' ?'Referal Doctor Added Successfully':'Data Added Successfully' }`)

    }catch(err){
      console.log(err)
    }

    this.setState({
        data:data
    })
  }


  deleteItem=(index,setdynamicData, name)=>{
    let data = [...this.state.data];
    data.splice(index,1)

    try{
      setdynamicData(data,name)
  }catch(err){
    console.log(err)
  }
    this.setState({
        data
    })
  }

  handleCancleIMG=()=>{
    this.setState({
      previewVisible: false,
      });
  }
imagePreview = async(file) => {
  // console.log('file',file)
  if (!file.url && !file.preview) {
  file.preview = await getBase64(file.originFileObj);
  }

  this.setState({
  previewImage: file.url || file.preview,
  previewVisible: true,
  });
};


  render() {
//  console.log('data table',this.state.data)
      let a = []
      let columns=this.props.fields.map((p)=>{
        // console.log('p',p)
        if(p.type=="datepicker"){
          return{
            title: p.label,
            dataIndex: p.name,
            key: p.name,
            width: 150,
            render: (p) => {
              var dateString = moment(p).format("DD-MM-YYYY");
              return(
                  <span>{dateString}</span>
              )
          }
          }
        }
        if(p.type=="upload" ){
          // console.log('props',p)
          return{
            title: p.label,
            dataIndex: p.name,
            key: p.name,
            width: 150,
            render: (p) => {
              // console.log('p file',p)

            return (
              <>
              <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              className='docmentView'
              listType="picture-card"
              defaultFileList={p && p.fileList!=undefined ? p.fileList:[]}
              onPreview={this.imagePreview}
              onRemove={()=>{
                return false
              }}
            />
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancleIMG}>
              <img alt="inside page image" style={{ width: '100%' }} src={this.state.previewImage} />
          </Modal>
          </>
          )
        
              // </Upload>
                
              // <img src={'https://ppl-inida-prod.s3.ap-south-1.amazonaws.com/PressRelease/rc-upload-1584334390029-4/Press-Release-creative2.jpg'} style={{ width: '50px' }}/>)
              // p.file.preview!=null ?
              // ( <img src={p.file.preview} style={{ width: '50px' }} />)
              //   :
                // ('not found')
                
            }
          }
        }
        return{
            title: p.label,
            dataIndex: p.name,
            key: p.name,
            width: 150,
            // ...this.getColumnSearchProps(p.name),

        }
      })
      a.push(
        {
          title: 'Action',
          dataIndex: 'action',
          render: (text,record) => <Button onClick={()=>{
              this.deleteItem(record.key,this.props.setdynamicData,this.props.name)
          }}>Delete</Button>,
        }
      )
      let colarr = [...columns,...a]
    

// console.log('data',this.state.data)
    return (
    <>
    <Row>
      <Col span={6} offset={18} style={{textAlign:'right',marginBottom:10}}>
          <Button  onClick={()=>{
              this.showModal()
          }}><PlusOutlined/>Add</Button>
      </Col>
    </Row>
    
    {/* {this.props.name!=undefined && this.props.name=='refDocInfo'&&
    <div style={{display:'flex'}}>
              <div>
                <p> Referral Type</p>
                <Select placeholder='Choose' style={{ width: '200px' }} onChange={selectReferalType}>
                  <Option value="GP">GP</Option>
                  <Option value="Consultant">Consultant</Option>
                </Select>
              </div>
              <div style={{ marginLeft: '20px' }} > 
              <p>Referral Doctor Name</p>
              <Select placeholder='Choose' style={{ width: '200px' }} >
                <Option value="GP">GP</Option>
                <Option value="Consultant">Consultant</Option>
              </Select>
              </div>
            </div>
    } */}

        <Table columns={colarr} dataSource={this.state.data}  size="small"/>
        <Modal
          title="Add Details"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={'80%'}
          footer={false}
        >
            <Form
              {...layout}
              onFinish={(values)=>{
               this.onFinish(values,this.props.setdynamicData,this.props.name,this.props.form)}}
              onFinishFailed={(errorInfo)=>{
              }}>
              <CustomForm 
                  columns={3} 
                  fields={this.props.fields} 
                  // initialValues={PatientRefDoctor} 
                  buttonName="Next"
              
                />
          {this.props.name!=undefined && this.props.name=='refDocInfo'&&
            <Form.Item name="referralType" rules={[{required:false}]}>
                <Checkbox.Group>
                    <Checkbox value={'CONSULTANT'}>{'Is Consultant Referral'}</Checkbox>
                </Checkbox.Group>
            </Form.Item>
          }
             <Button 
              type="primary" 
              htmlType="submit"
              style={{marginRight:10}}
              >
              Save
            </Button>
              <Button 
                onClick={()=>{
                    this.setState({
                        visible:false
                    })
                }}
                >
                Cancel
              </Button>
                
            </Form>
        </Modal>
    </>
    )
    ;
  }
}

export default TableWithForm
