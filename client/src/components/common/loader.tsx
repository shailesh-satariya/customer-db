import React from "react";

/**
 * Loader component
 *
 * @constructor
 *
 * @return JSX.Element
 */
const Loader: React.FC = (): JSX.Element => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
