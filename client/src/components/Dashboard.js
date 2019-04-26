import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sessions from "./Sessions";
import Home from "./Home";

export default class Dashboard extends Component {

    render() {
        return (
            <main className="dashboard">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/sessions' render={(routeProps) => (
                               <Sessions {...routeProps}
                                 filters={this.props.filters}
                                 predicateFields={this.props.predicateFields}
                                 stringOperators={this.props.stringOperators}
                                 integerOperators={this.props.integerOperators}
                                 handleAddFilter={this.props.handleAddFilter}
                                 handleRemoveFilter={this.props.handleRemoveFilter}
                                 buildQuery={this.props.buildQuery}
                                 queryString={this.props.queryString}
                               />
                               )}
                    />
                </Switch>
            </main>
        );
    }
}
