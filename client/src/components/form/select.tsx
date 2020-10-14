import React from "react";
import {InputProps, SelectOption} from "../../types";

/**
 * Select component
 *
 * @param name string
 * @param options SelectOption[]
 * @param label string
 * @param error any
 * @param rest Record<string, any>
 * @constructor
 *
 * @return JSX.Element
 */
const Select: React.FC<InputProps> = ({name, options, label, error, ...rest}: InputProps): JSX.Element => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select {...rest} name={name} id={name} data-testid={`${name}-input`}
                    className={"form-control" + (error ? " is-invalid" : "")}>
                {options.map((option: SelectOption) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
