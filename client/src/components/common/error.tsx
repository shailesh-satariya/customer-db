import React from "react";

interface ErrorProps {
    message: string;
}

/**
 * Error component
 *
 * @param message
 * @constructor
 *
 * @return JSX.Element
 */
const Error: React.FC<ErrorProps> = ({message}: ErrorProps): JSX.Element => {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
        </div>
    );
};

export default Error;
