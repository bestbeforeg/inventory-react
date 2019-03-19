import React from 'react';
import TextInput from "../Components/TextInput";
import Select from "../Components/Select";
import FormAbstract from "../FormAbstract";

class FormEdit  extends FormAbstract {

  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        name: {
          value: this.props.name,
          valid: true,
          validationRules: {
            isRequired: true
          },
        },
        parent: {
          value: this.props.parent,
          options: this.props.categories,
        }
      },
      valueChanged: false,
    }
  }

  changeEditHandler = event => {
    this.changeHandler(event);

    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      valueChanged: value !== this.props[name],
    });
  };

  render() {
    return (
      <div className='details container'>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 m12">
              <div className="card light-grey lighten-4">
                <div className="card-content">
                  <h5 className="card-title">Edit</h5>
                  <div className="row">
                    <TextInput
                      name="name"
                      id="name"
                      value={this.state.formControls.name.value}
                      onChange={this.changeEditHandler}
                      valid={this.state.formControls.name.valid}
                      error='Input "Name" must not be empty!'
                    />
                    <Select
                      name="parent"
                      value={this.state.formControls.parent.value}
                      onChange={this.changeEditHandler}
                      options={this.state.formControls.parent.options}
                    />
                  </div>
                </div>
                <div className="card-action right-align">
                  <button className={"btn waves-effect waves-light" +
                          (!this.state.valueChanged ? " disabled" : this.state.formControls.name.valid ? " " : " disabled")}
                          type="submit" name="action">
                    Save
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

export default FormEdit;