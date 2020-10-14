import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import {Column} from "../../types";

interface TableProps {
    columns: Column[];
    sort: string;
    onSort: (sort: string) => void;
    records: Record<string, any>[];
    selectedRecord: any
}

/**
 * Table component
 *
 * @param columns
 * @param sortColumn
 * @param onSort
 * @param records
 * @constructor
 *
 * @return JSX.Element
 */
const Table = ({columns, sort, onSort, records, selectedRecord}: TableProps): JSX.Element => {
    return (
        <table className="table table-striped table-bordered">
            <TableHeader columns={columns} sort={sort} onSort={onSort}/>
            <TableBody records={records} columns={columns} selectedRecord={selectedRecord}/>
        </table>
    );
};

export default Table;
