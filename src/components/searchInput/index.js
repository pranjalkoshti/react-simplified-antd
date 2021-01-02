import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
 
}

class SearchInputComp extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    data: [],
    value: undefined,
  };

  handleSearch = value => {
    // if (value) {
    //   fetch(value, data => this.setState({ data }));
    //   this.props.SearchPatientWithName(value)
    // } else {
    //   this.setState({ data: [] });
    // }
  };

  handleChange = value => {
    this.setState({ value });
    this.props.onChangeVal(this.props.type,value)
  };

  render() {
// console.log(this.props.data)
    const options = (this.props.data ? this.props.data : []).map(d => <Option key={d} value={d}>{d}</Option>);
    return (
      <Select
        disabled={this.props.data.length == 0}
        showSearch
        value={this.props.value != null ? this.props.value : this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        filterOption={(input, option) =>{
         return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        }
      >
        {options}
      </Select>
    );
  }
}

export default SearchInputComp;