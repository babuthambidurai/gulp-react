'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var View = require('./View.jsx');
var Components = require('./Components.jsx');

ReactDOM.render(<Components />, document.getElementById('menu'));
ReactDOM.render(<View />, document.getElementById('root'));