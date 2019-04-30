import React, { Component } from 'react';

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-content">
                    <div className="home-content-blocks">

                        <div className="home-content-block videoBlock">
                            <h4>Hello Quantum Metric!</h4>
                            <div className="videoWrapper" data-videoid="c4256928-e042-ae24-2926-0a44610c68f1">
                                <iframe className="bbVideoIframe"
                                src="https://bbemaildelivery.com/bbext/?p=vidEmbed&id=c4256928-e042-ae24-2926-0a44610c68f1"
                                frameBorder="0" scrolling="no" mozallowfullscreen webkitallowfullscreen
                                allowFullScreen></iframe>
                            </div>
                            <p>This was a really great experience, and I learned a few things. I recorded a video here going through my assignment and some of my code above. I really appreciate your time and consideration in this process, and hope to hear from you guys soon!</p>
                        </div>

                        <div className="home-content-block challenges">
                            <details>
                                <summary><span>Challenges Of This Assignment</span></summary>
                                <ul>
                                    <li>It's been a long time since I've set up an Express server. I went through a couple of boilerplates to make sure I was doing it in the best way.</li>
                                    <li>I learned how to use Heroku for hosting, but got sidetracked in attempting to use their PostgreSQL environment to potentially setup a test query. Unfortunately, I wasn't able to get it setup.</li>
                                    <li>My algorithm for the Search Filter and generation of the query string probably has room for improvement. I initially oversimplified the assignment in my head, and started the project without a lot of algorithm development. This resulted in me having to go back and think through it with a "rubber ducky" programming mindset and that helped drastically!</li>
                                </ul>
                            </details>
                        </div>

                    </div>

                    <div className="home-content-blocks">
                        <div className="home-content-block time">
                            <details>
                                <summary><span>Time Spent</span></summary>
                                <ul>
                                    <li>Express Server Setup <span className="time-spent">2.5 Hours</span></li>
                                    <li>Building the React App, Routing, and basic components.<span className="time-spent">2 Hours</span></li>
                                    <li>Developing the search feature. <span className="time-spent"> 2 Hours</span></li>
                                    <li>Rethinking the algorithm. <span className="time-spent"> 1 Hour</span></li>
                                    <li>Improving the search feature. <span className="time-spent"> 1.5 Hours</span></li>
                                    <li>Layout and SCSS Design <span className="time-spent">1.5 Hours</span></li>
                                </ul>
                            </details>
                        </div>

                        <div className="home-content-block references">
                            <details>
                                <summary><span>References</span></summary>
                                <p>All work is my own, but I did need to a reference a boilerplate guide to the Express and Heroku setup. I still had to add all of my own features and logic, but wanted to mention it.</p>
                                <ul>
                                    <li><a target="_blank" href="https://daveceddia.com/deploy-react-express-app-heroku/">Express/Heroku Guide</a></li>
                                </ul>
                            </details>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}