import React, { Component } from 'react';
import SearchSessions from "./SearchSessions";
import DataTable from "./DataTable";

export default class Sessions extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <h2>Find a Session</h2>
                </div>
                <div className="sessions">
                    <SearchSessions
                        filters={this.props.filters}
                        predicateFields={this.props.predicateFields}
                        stringOperators={this.props.stringOperators}
                        integerOperators={this.props.integerOperators}
                        handleAddFilter={this.props.handleAddFilter}
                        handleRemoveFilter={this.props.handleRemoveFilter}
                        buildQuery={this.props.buildQuery}
                    />

                </div>
                <div className="data-report">
                    <DataTable
                        queryString={this.props.queryString}
                    />
                </div>
            </React.Fragment>
        );
    }
}