import React from 'react';
import axios from 'axios';
import { Dropdown, Form, Input, TextArea } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const style = {
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 5,
  },
  required: {
    color: 'red',
  },
};

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessList: [],
      searchQuery: '',
      startDate: this.props.date ? moment(this.props.date.slice(0, 11), 'YYYY-MM-DD') : null,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.application._id === undefined) {
      this.props.getID();
    }
  }

  handleSearchChange(e, { searchQuery }) {
    this.setState({ searchQuery });
    axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.searchQuery}`)
      .then((response) => {
        // semantic renders dropdown by text property
        const mapped = response.data.map((b) => {
          b.text = b.name;
          b.image = { avatar: true, src: b.logo };
          return b;
        });
        this.setState({ businessList: mapped });
      })
      .catch(err => console.log(err));
  }

  handleChange(date) {
    this.setState({ startDate: date });
    this.props.handleDateChange(date);
  }

  render() {
    const {
      handleMouseDown,
      handleChange,
      handleStatusChange,
      position,
      date,
      company,
      status,
      notes,
    } = this.props;
    const options = [
      { key: 1, text: 'In Progress', value: 'In Progress' },
      { key: 2, text: 'Submitted', value: 'Submitted' },
      { key: 3, text: 'Phone Screen', value: 'Phone Screen' },
      { key: 4, text: 'Onsite Interview', value: 'Onsite Interview' },
      { key: 5, text: 'Offer', value: 'Offer' },
    ];
    console.log('date from props', date)
    console.log('startDate',this.state.startDate)
    return (
      <div>
        <Form>
          <div style={style.text}>Company</div>
          <Dropdown
            fluid
            selection
            multiple={false}
            search={true}
            options={this.state.businessList}
            placeholder={company}
            onSearchChange={this.handleSearchChange}
            onMouseDown={handleMouseDown}
            disabled={false}
            loading={false}
            id="currentCompany"
          />
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label="Position"
            type="text"
            id="inputPosition"
            placeholder={position}
            value={position}
          />
          <div style={style.text}>
            Date Applied
          </div>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            placeholderText="Click to select date"

          />
          <br />
          <div style={style.text}>
            Application Status<span style={style.required}> *</span>
          </div>
          <Dropdown
            onChange={handleStatusChange}
            options={options}
            placeholder={status ? status : 'Choose an option'}
            selection
            selectOnNavigation={false}
            id="selectedStatus"
          />
          <br />
          <br />
          <Form.TextArea
            onChange={handleChange}
            id="notes"
            placeholder="Save additional notes (who you met with, what you talked about, how your interview went, etc.)"
            value={notes}
            autoHeight={true}
            label="Notes"
          />
        </Form>
      </div>
    );
  }
}

export default ModalForm;
