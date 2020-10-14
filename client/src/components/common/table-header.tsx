import React, {Component} from "react";
import {Column, SortColumn} from "../../types";

interface TableHeaderProps {
    columns: Column[];
    sort: string;
    onSort: (sort: string) => void;
}

/**
 * Table header component
 */
class TableHeader extends Component<TableHeaderProps> {
    props: TableHeaderProps;

    /**
     * Constructor
     *
     * @param {TableHeaderProps} props
     */
    constructor(props: TableHeaderProps) {
        super(props);
        this.props = props;
    }

    /**
     * Gets sort object from string
     *
     * @param sort
     *
     * @return SortColumn
     */
    getSortObject(sort: string): SortColumn {
        const sortPath: string = sort.length && sort[0] === '-' ? sort.substr(1) : sort;
        const sortOrder = sort.length && sort[0] === '-' ? 'desc' : 'asc';

        return {
            path: sortPath,
            order: sortOrder
        }
    }

    /**
     * Triggers sort
     *
     * @param column
     */
    raiseSort = (column: Column): void => {
        if (!column.sortable) {
            return;
        }

        const path: string = column.path;
        const sortColumn: SortColumn = this.getSortObject(this.props.sort);
        this.props.onSort(((sortColumn.path === path && sortColumn.order === 'asc') || (column.defaultOrder === 'desc' && sortColumn.path !== path)) ? `-${path}` : path);
    };

    /**
     * Renders sort icon
     *
     * @param column Column
     *
     * @return JSX.Element | null
     */
    renderSortIcon = (column: Column): JSX.Element | null => {
        const sortColumn: SortColumn = this.getSortObject(this.props.sort);

        if (column.path !== sortColumn.path) return null;

        return sortColumn.order === "asc" ? (
            <span>▴</span>
        ) : (
            <span>▾</span>
        );
    };

    /**
     * @return JSX.Element
     */
    render(): JSX.Element {
        return (
            <thead>
            <tr>
                {this.props.columns.map(column => (
                    <th
                        key={column.path || column.key}
                        onClick={() => this.raiseSort(column)}
                        style={column.sortable ? {cursor: "pointer"} : {}}
                    >
                        {column.label} {this.renderSortIcon(column)}
                    </th>
                ))}
            </tr>
            </thead>
        );
    }
}

export default TableHeader;
