import React, { Component } from 'react';

export default class FormField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPredicateSelected: false,
            isOperatorSelected: false,
            isLoading: true,
            predicateTooltip: "Search through a large variety filters to narrow down your sessions."
        };

        const timeout = null;
    }

    // Get first column from form and let it trigger the next field on change.
    // Maybe could use onClick for this instead of change?.
    getPredicateFields = () => {
        let predicateFields = this.props.predicateFields;
        if (this.props.index === 0) {
            return (
                <React.Fragment>
                    <div className="tooltip">
                        <select key={this.props.index}
                                className="select-field predicate"
                                name={"predicateField" + this.props.index} id="predicateField"
                                onChange={(e) => this.handlePredicateSet(e)}>
                            {predicateFields.map((field, index) => (
                                <option key={index} value={field.predicateField}>{field.fieldName}</option>
                            ))}
                        </select>
                        <span className="tooltiptext tooltip-bottom">{this.state.predicateTooltip}</span>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <span className="conjunction">AND</span>
                    <div className="tooltip">
                        <select key={this.props.index}
                                className="select-field predicate"
                                name={"predicateField" + this.props.index} id="predicateField"
                                onChange={(e) => this.handlePredicateSet(e)}>
                            {predicateFields.map((field, index) => (
                                <option key={index} value={field.predicateField}>{field.fieldName}</option>
                            ))}
                        </select>
                        <span className="tooltiptext tooltip-bottom">{this.state.predicateTooltip}</span>
                    </div>
                </React.Fragment>
            )
        }
    };

    // Change Predicate state once it's set to get next field.
    handlePredicateSet = (e) => {
        let value = e.target.value;
        let predicateFields = this.props.predicateFields;
        let predicateType;
        let predicatePlaceholder;
        let predicateTooltip;
        for (let i = 0; i < predicateFields.length; i++) {
            if (predicateFields[i].predicateField === value) {
                predicateType = predicateFields[i].type;
                predicatePlaceholder = predicateFields[i].placeholder;
                predicateTooltip = predicateFields[i].tooltipContent;
            }
        }
        this.setState({
            isPredicateSelected: true,
            predicateValue: value,
            predicateType: predicateType,
            predicatePlaceholder: predicatePlaceholder,
            predicateTooltip: predicateTooltip
        });
    };

    // Get second column from from fields dependent on the value of the first column.
    getOperatorFields = () => {
        let predicateType = this.state.predicateType;
        if (predicateType === "integer") {
            return (
                <select key={this.props.index}
                        name={"operatorField" + this.props.index} id="operatorField"
                        className="select-field operator"
                        onChange={(e) => this.handleOperatorSet(e)}>
                    {this.props.integerOperators.map((integer, index) => (
                        <option key={index} value={integer.value}>{integer.prettyName}</option>
                    ))}
                </select>
            )
        } else if (predicateType === "string") {
            return (
                <select key={this.props.index}
                        name={"operatorField" + this.props.index} id="operatorField"
                        className="select-field operator"
                        onChange={(e) => this.handleOperatorSet(e)}>
                    {this.props.stringOperators.map((string, index) => (
                        <option key={index} value={string.value}>{string.prettyName}</option>
                    ))}
                </select>
            )
        }
    };

    // Change Operator state once it's set to get next field.
    handleOperatorSet = (e) => {
        let value = e.target.value;
        this.setState({
            isOperatorSelected: true,
            operatorValue: value
        });
    };

    // Get third and fourth input fields as needed
    getInputField = () => {
        let operatorType = this.state.predicateType;
        let operatorValue = this.state.operatorValue;

        if (operatorType === "integer" && operatorValue === "between") {
            return (
                <React.Fragment>
                    <span className="conjunction">IS</span>
                    <input key={this.props.index}
                           type="number"
                           min={0}
                           name={"inputFieldOne" + this.props.index} id="inputField-1"
                           placeholder={this.state.predicatePlaceholder}
                           onKeyUp={(e) => this.handleFirstInputSet(e)}>
                    </input>
                    <span className="conjunction">AND</span>
                    <input key={this.props.index}
                           type="number"
                           min={0}
                           name={"inputFieldTwo" + this.props.index} id="inputField-2"
                           placeholder={this.state.predicatePlaceholder}
                           onKeyUp={(e) => this.handleSecondInputSet(e)}>
                    </input>
                </React.Fragment>
            )
        } else if (operatorType === "integer") {
            return (
                <React.Fragment>
                    <input key={this.props.key}
                           type="number"
                           min={0}
                           name={"inputFieldOne" + this.props.index} id="inputField-1"
                           placeholder={this.state.predicatePlaceholder}
                           onKeyUp={(e) => this.handleFirstInputSet(e)}>
                    </input>
                </React.Fragment>
            )
        } else if (operatorType === "string") {
            return (
                <React.Fragment>
                    <input key={this.props.key}
                           type="text"
                           name={"inputFieldOne" + this.props.index} id="inputField-1"
                           placeholder={this.state.predicatePlaceholder}
                           onKeyUp={(e) => this.handleFirstInputSet(e)}>
                    </input>
                </React.Fragment>
            )
        }
    };

    // Event handler to assign text field value.
    // Set timeput to prevent bloat of query generating function.
    handleFirstInputSet = (e) => {
        let value = e.target.value;
        this.setState({
            inputFieldOneValue: value
        });

    };

    // Event handler to assign second text field value.
    handleSecondInputSet = (e) => {
        let value = e.target.value;

        this.setState({
            inputFieldTwoValue: value
        });
    };


    render() {
        const { isPredicateSelected, isOperatorSelected } = this.state;
        return (
            <React.Fragment>
                <div className="input-group custom-select">
                    {this.getPredicateFields()}

                    {isPredicateSelected ? (
                        this.getOperatorFields()
                    ) : (
                        <p className="loading"></p>
                    )}

                    {isOperatorSelected ? (
                        this.getInputField()
                    ) : (
                        <p className="loading"></p>
                    )}

                    <button className="deleteFilter tooltip" onClick={() => this.props.handleRemoveFilter(this.props.index)}>
                        <i className="fa fa-trash"></i>
                        <span className="tooltiptext tooltip-top">Remove Filter</span>
                    </button>
                </div>
            </React.Fragment>
        );
    }
}