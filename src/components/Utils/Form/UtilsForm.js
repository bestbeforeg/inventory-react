export const FormOptionChange = (e, propName) => {
    console.log(propName);
    this.setState({
        [propName]: e.target.value
    });
};

export const FormInputChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    });
};

export const FormSubmit = (e) => {
    e.preventDefault();
    console.log("state = ", this.state);
};