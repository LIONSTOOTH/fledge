import React from 'react';
import axios from 'axios';
import { Dropdown, Form, Input } from 'semantic-ui-react';

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessList: [],
      searchQuery: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e, { searchQuery }) {
    this.setState({ searchQuery });
    axios.get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.searchQuery}`)
      .then(response => {
        //semantic renders dropdown by text property
        var mapped = response.data.map(b => {
          b.text = b.name;
          return b;
        });
        console.log('RESPONSE', mapped);
        this.setState({ businessList: mapped });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { handleMouseDown, handleChange, handleStatusChange, position, date, company, status } = this.props;
    const { value } = this.state;
    const d = new Date(date);
    const options = [
      { key: 1, text: 'In Progress', value: 'In Progress' },
      { key: 2, text: 'Submitted', value: 'Submitted' },
      { key: 3, text: 'Phone Screen', value: 'Phone Screen' },
      { key: 4, text: 'Onsite Interview', value: 'Onsite Interview' },
      { key: 5, text: 'Offer', value: 'Offer' },
    ];
    return (
      <div>
        <Form>
          <div>
            <label>Company Name</label>
            <Dropdown
              fluid
              selection
              multiple={false}
              label="Company"
              search={true}
              options={this.state.businessList}
              placeholder={company}
              onSearchChange={this.handleSearchChange}
              onMouseDown={handleMouseDown}
              disabled={false}
              loading={false}
              id="currentCompany"
            />
          </div>
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label="Position"
            type="text"
            id="inputPosition"
            placeholder={position}
          />
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label={`Date Applied: ${ isNaN(d.getMonth()) ? '' : ((d.getMonth()+1) +'/'+ (d.getDate()+1) +'/'+ d.getFullYear())}` }
            type="date"
            id="inputDate"
          />
          <br />
          <Dropdown
            onChange={handleStatusChange}
            options={options}
            placeholder={status ? status : 'Choose an option'}
            selection
            selectOnNavigation={false}
            id="selectedStatus"
          />
        </Form>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ModalForm;
