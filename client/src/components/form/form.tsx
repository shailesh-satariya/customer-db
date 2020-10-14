import React, {Component} from "react";
import Input from "./input";
import Select from "./select";
import {InputElement, InputObj} from "../../types";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const Joi = require("joi-browser");

interface FormState {
    data: Record<string, any> | null;
    errors: Record<string, any>;
}

interface FormProps {

}

/**
 * Form component
 */
class Form<P, S> extends Component<FormProps, FormState> {
    state: FormState = {
        data: {},
        errors: {}
    };

    schema: Record<string, any> = {};

    /**
     * Validates form and returns the form errors
     *
     * @return Record<string, any> | null
     */
    validate = (): Record<string, any> | null => {
        const options = {abortEarly: false, stripUnknown: true};
        const result = Joi.validate(this.state.data, this.schema, options);
        if (!result.error) return null;

        const errors: Record<string, any> = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    };

    /**
     * validates the form property with given name and value
     *
     * @param name string
     * @param value any
     *
     * @return string | null
     */
    validateProperty = (name: string, value: any): string | null => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    };

    /**
     * Handles input change
     *
     * @param input React.ChangeEvent<InputElement>
     */
    handleChange = ({currentTarget: input}: InputObj | React.ChangeEvent<InputElement>): void => {
        const errors: Record<string, any> = {...this.state.errors};
        const name: string = input.name;

        let value: any;
        const schema = this.schema[name];
        value = (schema && schema._type === 'number')
            ? parseInt(input.value) : input.value;

        const errorMessage: any = this.validateProperty(name, value);
        this.setState({errors: errors || {}});
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data: Record<string, any> = {...this.state.data};
        data[input.name] = value;

        this.setState({data, errors});
    };

    /**
     * Handles form submit
     *
     * @param e React.FormEvent
     */
    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});

        if (errors) return;

        this.doSubmit();
    };

    /**
     * Submits the form
     */
    doSubmit = (): void => {

    };

    getFormValue = (name: string): any => {
        const {data}: FormState = this.state;
        return data && data[name] ? data[name] : '';
    };

    /**
     * Renders the submit button
     *
     * @param label string
     *
     * @return JSX.Element
     */
    renderSubmitButton = (label: string): JSX.Element => {
        return (
            <button disabled={!!this.validate()} data-testid="submit-btn" className="btn btn-primary">
                {label}
            </button>
        );
    };

    /**
     * renders input field
     *
     * @param name string
     * @param label string
     * @param type string
     *
     * @return JSX.Element
     */
    renderInput = (name: string, label: string, type: string = "text"): JSX.Element => {
        const {errors}: FormState = this.state;
        const value: any = this.getFormValue(name);

        return (
            <Input
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    /**
     * renders select field
     *
     * @param name string
     * @param label string
     * @param options Record<string, any>
     *
     * @return JSX.Element
     */
    renderSelect = (name: string, label: string, options: Record<string, any>): JSX.Element => {
        const {errors}: FormState = this.state;
        const value: any = this.getFormValue(name);

        return (
            <Select
                name={name}
                value={value}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    /**
     * renders datepicker
     *
     * @param name string
     * @param label string
     *
     * @return JSX.Element
     */
    renderDatePicker = (name: string, label: string): JSX.Element => {
        const {errors}: FormState = this.state;
        const value: any = this.getFormValue(name);
        const error: string | undefined = errors[name];
        const date: moment.Moment = value ? moment(value) : moment();

        const handleChange = (date: Date): void => {
            const dateStr: string = moment(date).format('YYYY-MM-DD');
            this.handleChange({currentTarget: {name: name, value: dateStr}});
        };

        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <div>
                    <DatePicker
                        data-testid={`${name}-date`}
                        selected={date.toDate()}
                        onChange={handleChange}
                        className="form-control"
                        showYearDropdown={true}
                        showMonthDropdown={true}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    };

    render(): JSX.Element | null {
        return null;
    }
}

export default Form;
