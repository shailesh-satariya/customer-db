import React, {Component} from "react";
import _ from "lodash";
import {Column} from "../../types";

interface TableBodyProps {
    columns: Column[];
    records: Record<string, any>[];
    selectedRecord: any
}

interface TableBodyStates {
    selectedRecord: any
}

/**
 * Table body component
 */
class TableBody extends Component<TableBodyProps, TableBodyStates> {
    state: TableBodyStates = {
        selectedRecord: null
    }

    props: TableBodyProps;

    /**
     * Constructor
     *
     * @param {TableBodyProps} props
     */
    constructor(props: TableBodyProps) {
        super(props);
        this.props = props;

        this.state.selectedRecord = props.selectedRecord;
    }

    /**
     * Renders cell content
     * @param record any
     * @param column Column
     * @param index number
     *
     * @return JSX.Element | string | null
     */
    renderCell = (record: Record<string, any>, column: Column, index: number): JSX.Element | string | null => {
        if (column.content) return column.content(record, index);
        else return _.get(record, column.path);
    };

    /**
     * Creates unique row key
     *
     * @param record any
     * @param column Column
     *
     * @return string
     */
    createKey = (record: Record<string, any>, column: any): string => {
        return record._id + (column.path || column.key);
    };

    /**
     * Set selected record
     *
     * @param selectedRecord
     */
    setSelectedRecord = (selectedRecord: any): void => {
        this.setState({selectedRecord});
    }

    /**
     * @return JSX.Element
     */
    render(): JSX.Element {
        const {records, columns}: TableBodyProps = this.props;
        const {selectedRecord}: TableBodyStates = this.state;

        return (
            <tbody>
            {
                records.map((record: Record<string, any>) => (
                    <tr key={record._id} onClick={() => this.setSelectedRecord(record)}
                        className={(selectedRecord && record._id === selectedRecord._id) ? 'table-primary' : ''}>
                        {columns.map((column: Column, index: number) => (
                            <td key={this.createKey(record, column)}>
                                {this.renderCell(record, column, index)}
                            </td>
                        ))}
                    </tr>
                ))
            }
            </tbody>
        );
    }
}

export default TableBody;
