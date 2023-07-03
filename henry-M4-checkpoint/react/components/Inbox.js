import React from 'react';
import Message from './Message';
import store from '../redux/store';

export default class extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Inbox</h1>
            </div>
        );
    }

}