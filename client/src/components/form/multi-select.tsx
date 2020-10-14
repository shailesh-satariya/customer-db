import React from "react";
import {InputProps, SelectOption} from "../../types";

/**
 * Multi select component
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
const MultiSelect: React.FC<InputProps> = ({name, options, label, error, ...rest}: InputProps): JSX.Element => {
    const values: string[] = rest.value || [];
    const restCopy: Record<string, any> = {...rest};
    delete restCopy.value;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select {...restCopy} value={values} name={name} id={name} data-testid={`${name}-select`}
                    className={"form-control" + (error ? " is-invalid" : "")} multiple={true}>
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

export default MultiSelect;
