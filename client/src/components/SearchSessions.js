import React, { Component } from 'react';
import FormField from "./FormField";
import Sessions from "./Dashboard";

export default class SearchSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            isLoading: true,
            formControls: []
        };
    }

    // Get initial filters.
    getFilters = (filters) => {
        this.setState({
            filters: filters,
            isLoading: false,
        });
    };

    componentDidMount() {
        this.getFilters(this.props.filters);
    }

    componentDidUpdate(prevProps) {
        if (this.props.filters !== prevProps.filters) {
            let filters = this.state.filters;
            this.setState(prevState => ({
                filters: filters
            }));
            this.getFilters(this.props.filters);
        }
    }

    getFormField = (filter, index) => {
        return <FormField
            key={index}
            index={index}
            predicateFields={this.props.predicateFields}
            predicateField={filter.predicateField}
            stringOperators={this.props.stringOperators}
            integerOperators={this.props.integerOperators}
            fieldName={filter.fieldName}
            placeholder={filter.placeholder}
            filterType={filter.type}
            handleRemoveFilter={this.props.handleRemoveFilter}
        />
    };

    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.name = name;

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls
        });
    };

    formSubmitHandler = (e) => {
        e.preventDefault();
        this.props.buildQuery(this.state.formControls);
    };

    render() {
        const { isLoading, filters } = this.state;
        return (
            <React.Fragment>
                <div className="search-module">
                    <form onChange={(e) => this.changeHandler(e)}>
                        {!isLoading && filters.length > 0 ? (
                            filters.map((filter, index) => this.getFormField(filter, index))
                        ) : (
                            <p className="loading">No Filters Setup. Try adding one below!</p>
                        )}
                        <div className="search-buttons">
                            <button name="name" className="addFilter" onClick={(e) => this.props.handleAddFilter(e)}>
                                <i className="fas fa-plus"></i>
                                <span>Add Filter</span>
                            </button>
                            <button name="submit" type="submit" className="searchButton" onClick={(e) => this.formSubmitHandler(e)}>
                                <i className="fas fa-search"></i>
                                <span>Search</span>
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}