import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom';
import {Table} from "./common";
import {Column} from "../types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import auth from "../services/auth-service";
import moment from "moment";
import {convertMinutesToDuration} from "../utils/helper";
import {Customer} from "../types/graphql/customer";

interface CustomersTableProps {
    customers: Customer[];
    selectedCustomer: Customer | null,
    sort: string;
    onDelete: (customer: Customer) => void;
    onSort: (sort: string) => void;
}

interface CustomersTableState {
    deleteCustomer: Customer | null;
}

/**
 * CustomersTable component
 */
class CustomersTable extends Component<CustomersTableProps, CustomersTableState> {
    columns: Column[] = [
        {
            path: "firstname",
            label: "First name",
            sortable: true
        },
        {
            path: "lastname",
            label: "Last name",
            sortable: true
        },
        {
            path: "birthDate",
            label: "Birth date",
            content: (customer: Customer): string => {

                return moment(customer.birthDate).format('DD MMMM YYYY');
            },
            sortable: true
        }
    ];
    state: CustomersTableState = {
        deleteCustomer: null
    }
    props: CustomersTableProps;

    /**
     * Constructor
     *
     * @param {CustomersTableProps} props
     */
    constructor(props: CustomersTableProps) {
        super(props);
        this.props = props;

        const user = auth.getCurrentUser();

        if (user) {
            this.columns.push(this.buttonColumn);
        }
    }

    /**
     * Sets customer to be deleted
     *
     * @param deleteCustomer
     */
    setDeleteCustomer(deleteCustomer: Customer | null): void {
        this.setState({deleteCustomer});
    };

    buttonColumn: Column = {
        path: "options", label: "Options",
        content: (customer: Customer): JSX.Element => {
            return (
                <Fragment>
                    {
                        auth.canEdit(customer) ?
                            <Fragment>
                                <Link to={`/customers/${customer._id}`} className="text-white text-decoration-none">
                                    <button className="btn btn-success btn-sm mr-1 mt-1" type="button">
                                        Edit
                                    </button>
                                </Link>
                                <button className="btn btn-danger btn-sm mt-1"
                                        onClick={() => this.setDeleteCustomer(customer)}>Delete
                                </button>
                            </Fragment>
                            : null
                    }

                </Fragment>
            );
        }
    };


    /**
     * Handles customer deletion
     *
     * @param customer Customer
     */
    handleDeleteCustomer = async (customer: Customer | null): Promise<void> => {
        if (customer) {
            this.setState({deleteCustomer: null});
            await this.props.onDelete(customer);
        }
    }

    /**
     * @return JSX.Element
     */
    render(): JSX.Element {
        const {deleteCustomer}: CustomersTableState = this.state;
        const {customers, onSort, sort, selectedCustomer}: CustomersTableProps = this.props;

        return (
            <React.Fragment>
                <Modal show={!!deleteCustomer}
                       onHide={() => this.setDeleteCustomer(null)}
                       backdrop="static"
                       keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this record?.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setDeleteCustomer(null)}>No</Button>
                        <Button variant="primary" onClick={() => this.handleDeleteCustomer(deleteCustomer)}>Yes</Button>
                    </Modal.Footer>
                </Modal>

                <Table
                    records={customers}
                    columns={this.columns}
                    onSort={onSort}
                    sort={sort}
                    selectedRecord={selectedCustomer}
                />
            </React.Fragment>
        );
    }
}

export default CustomersTable;
