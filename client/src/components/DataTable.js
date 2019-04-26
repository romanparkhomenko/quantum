import React, { Component } from 'react';

export default class DataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sqlStatement: "",
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState(prevState => ({
            isLoading: true
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryString !== prevProps.queryString) {
            let sqlStatement = this.state.sqlStatement;
            this.setState(prevState => ({
                sqlStatement: sqlStatement
            }));
            this.getSQL(this.props.queryString);
        }
    }


    getSQL = (query) => {
        // Get the passwords and store them in state
        fetch(query)
            .then(res => res.json())
            .then(sqlStatement =>
                this.setState({
                    sqlStatement,
                    isLoading: false
                }));
    };

    render() {
        const { isLoading, sqlStatement } = this.state;
        return (
            <React.Fragment>
                <div className="datatable">
                    {!isLoading ? (
                        <h3>{sqlStatement}</h3>
                    ) : (
                        <p className="loading">Search something above to generate the SQL Statement</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}