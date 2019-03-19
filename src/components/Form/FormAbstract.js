import React from 'react';
import M from "materialize-css";

class FormAbstract extends React.Component {
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedControls[name] = updatedFormElement;
    updatedFormElement.valid = this.validate(value, updatedFormElement.validationRules);
    this.setState({
      formControls: updatedControls,
    }, M.updateTextFields());
  };

  componentWillUpdate(){
    M.updateTextFields();
  }

  validate = (value, rules) => {
    let isValid = true;

    for(let rule in rules) {
      switch (rule) {
        case 'isRequired':
          isValid = isValid && this.requiredValidator(value);
          break;
        case 'isNumber':
          isValid = isValid && this.mustBeNumberValidator(value);
          break;
        default: isValid = true;
      }
    }

    return isValid;
  };

  requiredValidator = value => {
    return value.trim() !== '';
  };

  mustBeNumberValidator = value => {
    return !isNaN(value);
  };



  handleSubmit = () => {
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }

    this.props.onSubmit(formData);
    // console.dir(formData);
  };

  componentDidMount(){
    M.FormSelect.init(document.getElementById('parent'));
    M.updateTextFields();
  }

}

export default FormAbstract;