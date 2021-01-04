import React, { useState, useEffect } from 'react';
import { Input, AutoComplete, Button } from 'antd';
import SearchInputComp from '../searchInput';
import moment from 'moment';

class BirthDateComp extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeVal = (type, val) => {
      if (type == 'month') {
        this.setState({
          selectedMonth: val
        });
      }

      if (type == 'year') {
        this.setState({
          selecetdYear: val
        });
      }

      if (type == 'day') {
        this.setState({
          selectedDate: val
        }); // ,()=>{
        //   // let m=this.props.form.getFieldValue(this.props.fieldName)
        //   // this.props.form.setFieldsValue({
        //     this.props.getBirthDate( `${selecetdYear?selecetdYear:moddate[0]}-${moment(selecetdYear?selecetdYear:moddate[0]).month(selectedMonth ? selectedMonth:moddate[1]).format("MM")}-${val ? val:moddate[2]}`)
        //   // })
        // })
      }
    };

    this.state = {
      years: [],
      months: moment.monthsShort(),
      dates: [],
      selecetdYear: null,
      selectedDate: null,
      selectedMonth: null,
      initial: false,
      value: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.date != null && state.initial == false) {
      return {
        value: props.date,
        initial: true,
        selecetdYear: moment(props.date).year(),
        selectedDate: moment(props.date).format('DD'),
        selectedMonth: moment(props.date).format('MMM')
      };
    }
  }

  componentDidMount() {
    let moddate = this.props.date != undefined && this.props.date != null && this.props.date.split('-');
    let yearData = [];

    for (let i = 0; i < 100; i++) {
      yearData.push(moment().subtract(i, 'years').year());
    }

    this.setState({
      years: yearData,
      selecetdYear: moddate[0],
      selectedMonth: moddate[1],
      selectedDate: moddate[2]
    });
  }

  render() {
    const {
      years,
      months,
      dates,
      selecetdYear,
      selectedMonth,
      selectedDate
    } = this.state;
    let value = null;

    if (selecetdYear != null && selectedMonth != null && selectedDate != null) {
      value = selecetdYear + '-' + selectedMonth + '-' + selectedDate;
    }

    if (value != null) {
      value = moment(value);
    }

    let date = null;
    let month = null;
    let year = null;

    if (value != null) {
      date = value.date();
    }

    if (value != null) {
      month = value.format('MMM');
    }

    if (value != null) {
      year = value.year();
    }

    let dateArr = [];

    if (selecetdYear != null && selectedMonth != null) {
      let monthNum = moment(selecetdYear).month(selectedMonth).format("MM");
      let numDate = moment(`${selecetdYear}-${monthNum}`, "YYYY-MM").daysInMonth();

      for (let i = 1; i < numDate + 1; i++) {
        let a = i < 10 ? '0' + i : `${i}`;
        dateArr.push(a);
      }
    }

    if (selecetdYear != null && selectedMonth != null && selectedDate != null) {
      if (this.props.onChange) {
        // console.log('selecetdYear',selecetdYear,selectedMonth,selectedDate)
        this.props.onChange(moment(`${selecetdYear}-${moment(selecetdYear).month(selectedMonth).format("MM")}-${selectedDate}`));
      }
    }

    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement(SearchInputComp, {
      value: year,
      type: "year",
      placeholder: "YYYY",
      data: years,
      onChangeVal: this.onChangeVal,
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(SearchInputComp, {
      value: month,
      type: "month",
      placeholder: "MM",
      data: months,
      onChangeVal: this.onChangeVal,
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(SearchInputComp, {
      value: date,
      type: "day",
      placeholder: "DD",
      data: dateArr,
      onChangeVal: this.onChangeVal,
      style: {
        flex: 1
      }
    }));
  }

}

export default BirthDateComp; // const BirthDateComp = () => {
//   const [years, setyears] = useState([])
//   const [months, setmonths] = useState(moment.monthsShort())
//   const [dates, setdates] = useState([])
//   const [selectedDate, setselectedDate] = useState(null)
//   const [selectedMonth, setselectedMonth] = useState(null)
//   const [selecetdYear, setselecetdYear] = useState(null)
//   useEffect(() => {
//     let yearData = [];
//     for(let i = 0;i<100;i++){
//       yearData.push(moment().subtract(i,'years').year())
//     }
//     setyears(yearData)
//   },[]);
//   useEffect(() => {
//     let dateArr = []
//    if(selecetdYear != null && selectedMonth != null){
//      let monthNum = moment(selecetdYear).month(selectedMonth).format("M");
//      let numDate = moment(`${selecetdYear}-${monthNum}`, "YYYY-MM").daysInMonth()
//      for(let i = 1;i<numDate+1;i++){
//       dateArr.push(i)
//      }
//      console.log(dateArr)
//     //  setdates(dateArr)
//    }
//   })
//   const onChangeVal=(type,val)=>{
//     if(type == 'month'){
//       setselectedMonth(val)
//     }
//     if(type == 'year'){
//       setselecetdYear(val)
//     }
//   }
//   return (
//     <div style={{display:'flex',flexDirection:'row'}}>
//         <SearchInputComp type="year" placeholder="yyyy" data={years} onChangeVal={onChangeVal}/>
//         <SearchInputComp type="month" placeholder="Month" data={months} onChangeVal={onChangeVal}/>
//         <SearchInputComp type="day" placeholder="dd" data={dates} onChangeVal={onChangeVal}/>
//     </div>
//   );
// };
// export default BirthDateComp