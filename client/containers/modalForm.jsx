import React from 'react';
import axios from 'axios';
import { Button, Icon, Dropdown, Form, Field, Input } from 'semantic-ui-react';
import { field, FieldArray, reduxForm, formValues } from 'redux-form';

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
    const { handleMouseDown, handleChange, position, date, company, status } = this.props;
    return (
      <div>
        <Form>
          <div>
            <label>Company Name</label>
            <Dropdown
              fluid
              selection
              multiple={false}
              search={true}
              options={this.state.businessList}
              //value={this.state.currentCompany}
              placeholder={company}
              onSearchChange={this.handleSearchChange}
              //onClose={this.handleClose}
              onMouseDown={handleMouseDown}
              disabled={false}
              loading={false}
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
          <div>
            <label htmlFor="date">Date Applied</label>
            <field
              name="date"
              component="input"
              type="text"
              placeholder={date}
            />
          </div>
          <br />
          <div>
            <label>Status</label>
            <span>
              <field name="status" component="select" placeholder="">
                <option value={status}>
                  {' '}
                  {status}
                </option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Onsite Interview">Onsite Interview</option>
                <option value="Offer">Offer</option>
              </field>
            </span>
          </div>
          <br />
          <br />
        </Form>
      </div>
    );
  }
}

export default ModalForm;
