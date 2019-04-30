import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import acmewhite from '../images/acme-logo-white.svg';

export default class Sidebar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className={this.props.openSidebar  ? 'sidebar' : 'sidebar mobile'}>
                    <div className="sidebar-header">
                        <div className="sidebar-logo">
                            <Link to="/"><img src={acmewhite} alt="acme-logo"/></Link>
                        </div>
                        <div className="header-close" onClick={() => this.props.openBar()}>
                            <i className="fas fa-bars"></i>
                        </div>
                    </div>

                    <div className="sidebar-links">
                        <ul>
                            <li><Link to='/'><i className="fas fa-home"></i><span>Home</span></Link></li>
                            <li><Link to='/sessions'><i className="fas fa-server"></i><span>Sessions</span></Link></li>
                            <li><a target="_blank" rel="noopener noreferrer"  href="https://github.com/romanparkhomenko/quantum"><i className="fab fa-github"></i><span>GitHub</span></a></li>
                        </ul>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}