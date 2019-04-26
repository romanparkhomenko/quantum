import React, { Component } from 'react';
import './styles/main.scss';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: [
                {
                    id: 0,
                    predicateField: "user_email",
                    fieldName: "User Email",
                    placeholder: "Enter Email",
                    type: "string"
                }
            ],
            openSidebar: true,
            queryString: "/api/sessions",
            query: [

            ]
        };
    }

    // Static array containing data fields.
    predicateFields = [
        {
            id: 0,
            predicateField: 'search_by',
            fieldName: "Search By...",
            placeholder: "Search By...",
            type: "string",
            tooltipContent: "Search through a large variety filters to narrow down your sessions."
        },
        {
            id: 1,
            predicateField: "user_email",
            fieldName: "User Email",
            placeholder: "Enter Email",
            type: "string",
            tooltipContent: "Search by a specific email address."
        },
        {
            id: 2,
            predicateField: "screen_width",
            fieldName: "Screen Width",
            placeholder: "Enter Screen Width",
            type: "integer",
            tooltipContent: "Search by a certain screen width. This helps you narrow down if your mobile users are having trouble! Hint: Most mobile devices have a width of 768px."
        },
        {
            id: 3,
            predicateField: "screen_height",
            fieldName: "Screen Height",
            placeholder: "Enter Screen Height",
            type: "integer",
            tooltipContent: "Search by a screen height by px."
        },
        {
            id: 4,
            predicateField: "num_of_visits",
            fieldName: "# Of Visits",
            placeholder: "Enter # Of Visits",
            type: "integer",
            tooltipContent: "Search by your most frequent visitors"
        },
        {
            id: 5,
            predicateField: "first_name",
            fieldName: "First Name",
            placeholder: "Enter First Name",
            type: "string",
            tooltipContent: "Search by your visitor's first name."
        },
        {
            id: 6,
            predicateField: "last_name",
            fieldName: "Last Name",
            placeholder: "Enter Last Name",
            type: "string",
            tooltipContent: "Search by your visitor's last name."
        },
        {
            id: 7,
            predicateField: "page_response_time",
            fieldName: "Page Response Time",
            placeholder: "Enter Page Response Time (ms)",
            type: "integer",
            tooltipContent: "See how your slowest pages are performing compared to your fastest."
        },
        {
            id: 8,
            predicateField: "domain",
            fieldName: "Domain",
            placeholder: "Enter Domain",
            type: "string",
            tooltipContent: "See what visitors from different sites are doing on yours."
        },
        {
            id: 9,
            predicateField: "page_path",
            fieldName: "Page Path",
            placeholder: "Enter Page Path",
            type: "string",
            tooltipContent: "See which of your visitors are performing the best."
        }
    ];

    stringOperators = [
        {
            id: 0,
            value: "Select Option",
            prettyName: "Select Option"
        },
        {
            id: 1,
            value: "equals",
            prettyName: "Equals"
        },
        {
            id: 2,
            value: "contains",
            prettyName: "Contains"
        },
        {
            id: 3,
            value: "starts_with",
            prettyName: "Starts With"
        },
        {
            id: 4,
            value: "in_list",
            prettyName: "In List"
        },
    ];

    integerOperators = [
        {
            id: 0,
            value: "Select Option",
            prettyName: "Select Option"
        },
        {
            id: 1,
            value: "equals",
            prettyName: "Equals"
        },
        {
            id: 2,
            value: "between",
            prettyName: "Between"
        },
        {
            id: 3,
            value: "greater_than",
            prettyName: "Greater Than"
        },
        {
            id: 4,
            value: "less_than",
            prettyName: "Less Than"
        },
        {
            id: 5,
            value: "in_list",
            prettyName: "In list"
        },
    ];


    //  Upon clicking the search button, build the actual query to send to the
    // express server. After that I could probably delete the existing query
    // unless I wanted to add it to the header?
    buildQuery = (formResults) => {
        const form = Object.values(formResults);
        let string = "/api/sessions?";

        /// Loop through form results and generate URL with params.
        for (let i = 0; i < form.length; i++) {
            if (i === 0) {
                string += form[i].name + "=" + form[i].value;
            } else {
                string += "&" + form[i].name + "=" + form[i].value;
            }
        }

        this.setState( prevState => {
            return {
                queryString: string
            };
        });

    };


    // Add new filter
    handleAddFilter = (e) => {
        e.preventDefault();
        this.setState( prevState => {
            return {
                filters: [
                    ...prevState.filters,
                    {
                        id: prevState.filters.length += 1,
                        predicateField: "user_email",
                        fieldName: "User Email",
                        placeholder: "Enter Email",
                        type: "string"
                    }
                ]
            };
        });
    };

    // Remove search filter
    handleRemoveFilter = (id) => {
        let oldFilters = this.state.filters;
        let updatedFilters = [...oldFilters];
        const filterToRemove = oldFilters.findIndex((filter) => filter.id === id);
        updatedFilters.splice(filterToRemove, 1);
        this.setState(prevState => {
                return {
                    filters: updatedFilters
                }
            },
            () => {
                this.forceUpdate();
            });
    };

    // Function to open up sidebar fully on mobile.
    openBar = () => {
        this.setState(prevState => {
            return {
                openSidebar: !prevState.openSidebar
            }
        });
    };

    render() {
        return (
            <div className="App">
                <Sidebar
                    isSidebarOpen={this.state.openSidebar}
                    openBar={this.openBar}
                />
                <Dashboard
                    filters={this.state.filters}
                    predicateFields={this.predicateFields}
                    stringOperators={this.stringOperators}
                    integerOperators={this.integerOperators}
                    handleAddFilter={this.handleAddFilter}
                    handleRemoveFilter={this.handleRemoveFilter}
                    buildQuery={this.buildQuery}
                    queryString={this.state.queryString}
                />
            </div>
        );
    }
}

export default App;