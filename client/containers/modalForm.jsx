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
          b.image = { avatar: true, src: b.logo };
          return b;
        });
        this.setState({ businessList: mapped });
        console.log('mapped',mapped)
      })
      .catch(err => console.log(err));
  }

  render() {
    const { handleMouseDown, handleChange, handleStatusChange, position, date, company, status } = this.props;
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
          <div style={{ fontSize: 13, fontWeight: 'bold' }}>Company</div>
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
          <br />
          <Form.Field
            control={Input}
            onChange={handleChange}
            label={`Date Applied: ${ isNaN(d.getMonth()) ? '' : ((d.getMonth()+1) +'/'+ (d.getDate()+1) +'/'+ d.getFullYear())}` }
            type="date"
            id="inputDate"
          />
          <div style={{ fontSize: 13, fontWeight: 'bold' }}>Application Status<span style={{ color: 'red' }}> *</span></div>
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
