import React from "react";
import {InputProps} from "../../types";


/**
 * Input component
 *
 * @param name string
 * @param label string
 * @param error any
 * @param rest Record<string, any>
 * @constructor
 *
 * @return JSX.Element
 */
const Input: React.FC<InputProps> = ({name, label, error, ...rest}: InputProps): JSX.Element => {
    const classNames = rest.type === 'checkbox' ? [] : ["form-control"];
    if (error) {
        classNames.push("is-invalid");
    }

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} data-testid={`${name}-input`} className={classNames.join(" ")}/>
            {error ? <div className="alert alert-danger">{error}</div> : null}
        </div>
    );
};

export default Input;

