'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var View = React.createClass({
	render : function() {
		return (
			<div>
				<h4>Hello World</h4>
				<p className="text-success"> React is ready !</p>
			</div>
		);
	}
});

module.exports = View;