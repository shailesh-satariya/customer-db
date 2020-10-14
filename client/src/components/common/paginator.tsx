import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import {CallbackFunctionVariadic} from "../../types";

const _ = require("lodash");

interface PaginatorProps {
    count: number;
    page: number;
    pageSize: number;
    pageSizes: number[];
    onPageChange: CallbackFunctionVariadic;
    onPageSizeChange: CallbackFunctionVariadic;
}

/**
 * Paginator component
 *
 * @param count number
 * @param page number
 * @param pageSizes number
 * @param pageSize number[]
 * @param onPageChange CallbackFunctionVariadic
 * @param onPageSizeChange CallbackFunctionVariadic
 * @constructor
 *
 * @return JSX.Element | null
 */
const Paginator: React.FC<PaginatorProps> = ({count, page, pageSizes, pageSize, onPageChange, onPageSizeChange}: PaginatorProps): JSX.Element | null => {
    if (!count)
        return null;

    page = page || 1;
    pageSize = pageSize || 25;
    pageSizes = pageSizes || [5, 10, 25, 50, 100];

    const totalPages = Math.ceil(count / pageSize);
    const pageBegin = Math.min((page - ((page - 1) % 5)), totalPages);
    const pageEnd = Math.min(pageBegin + 4, totalPages);
    const pages = _.range(pageBegin, pageEnd + 1);

    return (
        <div className="row">
            <div className="col">
                <Pagination>
                    {pageSizes.map((size: number) => (
                        <Pagination.Item key={size} active={pageSize === size}
                                         onClick={() => onPageSizeChange(size)}>{size}</Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <div className="col pagination justify-content-center">
                <Pagination>
                    <Pagination.Item
                        onClick={() => onPageSizeChange(Math.max(...pageSizes))}>{(page - 1) * pageSize + 1}...{Math.min(page * pageSize, count)} / {count}</Pagination.Item>
                </Pagination>
            </div>
            <div className="col pagination justify-content-end">
                <Pagination>
                    <Pagination.First onClick={() => onPageChange(1)} disabled={page === 1}/>
                    <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1}/>

                    {pages.map((p: number) => (
                        <Pagination.Item key={p} active={page === p}
                                         onClick={() => onPageChange(p)}>{p}</Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages}/>
                    <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={page === totalPages}/>

                </Pagination>
            </div>
        </div>

    );
}

export default Paginator;
