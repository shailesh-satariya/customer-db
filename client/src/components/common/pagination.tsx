import React from "react";
import PropTypes from "prop-types";
import {CallbackFunctionVariadic} from "../../types";

const _ = require("lodash");

interface PaginationProps {
    itemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: CallbackFunctionVariadic;
}

/**
 * Pagination
 *
 * @param itemsCount number
 * @param pageSize number
 * @param currentPage number
 * @param onPageChange function
 *
 * @constructor
 *
 * @return JSX.Element
 */
const Pagination: React.FC<PaginationProps> = ({itemsCount, pageSize, currentPage, onPageChange}: PaginationProps): JSX.Element | null => {
    const pageCount = Math.ceil(itemsCount / pageSize);

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((page: number) => (
                    <li
                        key={page}
                        className={page === currentPage ? "page-item active" : "page-item"}
                    >
                        <span className="page-link" onClick={() => onPageChange(page)} style={{cursor: 'pointer'}}>
                            {page}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
