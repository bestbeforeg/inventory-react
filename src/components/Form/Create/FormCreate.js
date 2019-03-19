import React from 'react';
import FormAbstract from "../FormAbstract";
import RadioButton from "../Components/RadioButton";
import TextInput from "../Components/TextInput";
import Select from "../Components/Select";
import * as M from "materialize-css";

class FormCreate  extends FormAbstract {

  constructor(props) {
    super(props);
    this.state = this.createInitialState(props.categories);
  };

  handleCreateFormSubmit = event => {
    event.preventDefault();
    this.handleSubmit();
    this.setState(this.createInitialState(this.props.categories));
  };

  componentWillReceiveProps = nextProps => {
    this.setState(this.createInitialState(nextProps.categories));
    const selects = document.querySelectorAll('select');
    setTimeout(() => {
      M.FormSelect.init(selects, {});
    });
  };

  createInitialState = (categories) => (
    {
      formControls: {
        name: {
          value: '',
          valid: true,
          validationRules: {
            isRequired: true
          },
        },
        parent: {
          value: '0',
          options: categories,
        },
        type: {
          value: '0',
          valid: false,
          touched: false,
          validationRules: {
            // isRequired: true,
          },
          options: [
            {value: '0', displayValue: 'Category'},
            {value: '1', displayValue: 'Collection'}
          ]
        }
      },
    }
  );

  render() {
    console.log("this.state.formControls.name ", this.props);
    return (
      <div className='details container'>
        <form onSubmit={this.handleCreateFormSubmit}>
          <div className="row">
            <div className="col s12 m12">
              <div className="card light-grey lighten-4">
                <div className="card-content">
                  <h5 className="card-title">Create new entry</h5>
                  <div className="row">
                    <RadioButton
                      name="type"
                      value={this.state.formControls.type.value}
                      options={this.state.formControls.type.options}
                      onChange={this.changeHandler}
                    />
                    <TextInput
                      name="name"
                      id="name"
                      value={this.state.formControls.name.value}
                      onChange={this.changeHandler}
                      valid={this.state.formControls.name.valid}
                      error='Input "Name" must not be empty!'
                    />
                    {console.log("before select", this.state.formControls.parent.options)}
                    <Select
                      name="parent"
                      value={this.state.formControls.parent.value}
                      onChange={this.changeHandler}
                      options={this.state.formControls.parent.options}
                    />
                  </div>
                </div>
                <div className="card-action right-align">
                  <button className={"btn waves-effect waves-light" + (!this.state.formControls.name.value  ? " disabled" : "")} type="submit" name="action">
                    Create
                    <i className="material-icons right">check</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default FormCreate;