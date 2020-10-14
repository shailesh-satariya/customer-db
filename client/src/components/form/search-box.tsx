import React, {useState} from "react";

interface SearchBoxProps {
    value: string,
    onChange: (value: string) => void;
}

/**
 * Search box
 *
 * @param value string
 * @param onChange function
 *
 * @constructor
 *
 * @return JSX.Element
 */
const SearchBox: React.FC<SearchBoxProps> = ({value, onChange}: SearchBoxProps): JSX.Element => {
    let textInput: HTMLInputElement | null;

    const [inputVal, setValue] = useState(value || '');
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        onChange(textInput ? textInput.value : '');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mt-2 mb-2"
                 style={{maxWidth: '300px'}}>

                <input
                    type="text"
                    name="query"
                    className="form-control"
                    placeholder="Search..."
                    value={inputVal}
                    ref={(input) => {
                        textInput = input;
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBox;
