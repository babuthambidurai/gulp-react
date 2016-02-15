
var React = require('react');
var ReactDOM = require('react-dom');
var faker = require('faker');
var View = require('./View.jsx');

//Data
	var employees = [];
	var load = function() {
		
		for(var i=0; i<10; i++) {
			employees.push({
				key : i,
				firstName : faker.name.firstName(),
				lastName : faker.name.lastName(),
				job : faker.name.jobTitle(),
				phone : faker.phone.phoneNumber(),
				company : faker.company.companyName()
			});
		}
	};
	
	load();
	
	var NavComponent = React.createClass({
		getInitialState : function() {
			return {
				clicked : 'world',
			};
		},
		load : function() {
			this.setState({
				clicked : 'world'
			});
			ReactDOM.render(<View />, document.getElementById('root'));
		},
		loadTable : function() {
			this.setState({
				clicked : 'employee'
			});
			ReactDOM.render(<Table />, document.getElementById('root'));
		},
		loadCalc : function() {
			this.setState({
				clicked : 'calc'
			});
			ReactDOM.render(<Calc />, document.getElementById('root'));
		},
		render : function() {
			return (
				<ul className="nav nav-pills nav-justified">
					<li role="presentation" className={ this.state.clicked == 'world' ? 'active' : ''}> <a onClick={this.load}> World </a> </li>
					<li role="presentation" className={ this.state.clicked == 'employee' ? 'active' : ''}> <a onClick={this.loadTable}> Employee </a> </li>
					<li role="presentation" className={ this.state.clicked == 'calc' ? 'active' : ''}> <a onClick={this.loadCalc}> Calculation </a> </li>
				</ul>
			);
		}
	});
	  
	 var ObjData = React.createClass({
        render: function() {
			return (<tr>
				<td>{this.props.emp.firstName}</td>
				<td>{this.props.emp.lastName}</td>
				<td>{this.props.emp.job}</td>
				<td>{this.props.emp.phone}</td>
				<td>{this.props.emp.company}</td>
			</tr>);
        }
      });

	  
	 var Table = React.createClass({
		render : function() {
			return (<table className="table table-bordered table-striped table-condensed">
					<tbody>
					<tr>
						<th> First Name </th>
						<th> Last Name </th>
						<th> Title </th>
						<th> Phone </th>
						<th> Company </th>
					</tr>
					{
						employees.map(function(emp) {
							return (
								<ObjData emp={emp} />
							);
						})
					}
					</tbody>
				</table>);
		}
	  });
	  
	  var stock = [
		  {key : "item1", category: "Sporting Goods", price: 49.99, stocked: true, name: "Football"},
		  {key : "item2", category: "Sporting Goods", price: 9.99, stocked: true, name: "Baseball"},
		  {key : "item3", category: "Sporting Goods", price: 29.99, stocked: false, name: "Basketball"},
		  {key : "item4", category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch"},
		  {key : "item5", category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5"},
		  {key : "item6", category: "Electronics", price: 199.99, stocked: true, name: "Nexus 7"}
		];

	 
	 var RowItem = React.createClass({
		getInitialState : function() {
			return {
				qty : 0,
				itemTotal : 0
			}
		},
		qtyChange : function() {
			var q = this.refs.qty.value;
			var tot = Math.round(q * this.props.item.price * 100)/100;
			this.setState({
				qty : this.refs.qty.value,
				itemTotal : tot
			});
			this.props.onUpdate(this.props.item.key, tot);
		},
		getTotal : function() {
			return itemTotal;
		},
        render: function() {
			var qtyFld;
			if(this.props.item.stocked) {
				qtyFld = <input type="number" ref="qty" onChange={this.qtyChange}/>;
			} else {
				qtyFld = <input type="number" value="" disabled="true" ref="qty"/>
			}
			return (
				<div className="row">
					<div className="col-sm-3">
						<p className="text-primary"> {this.props.item.category} </p>
					</div>
					<div className="col-sm-3">
						<p className="text-primary"> {this.props.item.name} </p>
					</div>
					<div className="col-sm-2">
						<p className="text-danger"> ${this.props.item.price} </p>
					</div>
					<div className="col-sm-2">
						<p className="text-primary">{qtyFld}</p>
					</div>
					<div className="col-sm-2">
						<p className="text-danger"> {this.state.itemTotal} </p>
					</div>
				</div>);
        }
      });
	 
	 var Calc = React.createClass({
		keys : [],
		data : new Map(),
		getInitialState : function() {
			return {
				total : 0
			};
		},
		update : function(key, total) {
			this.data.set(key, total);
			this.doCalc();
		},
		doCalc : function() {
			var cost=0;
			var n = this.keys.length;
			this.data.forEach(function(value, key, map) {
				cost += value;
			});
			cost = Math.round(cost * 100) / 100;
			this.setState({
				total : cost
			});
		},
        render: function() {
			var ref = this;
			return (
				<div>
					<div className="row">
						<div className="col-sm-3 header">
							<label > Category </label>
						</div>
						<div className="col-sm-3 header">
							<label> Name </label>
						</div>
						<div className="col-sm-2 header">
							<label> Price($) </label>
						</div>
						<div className="col-sm-2 header">
							<label> Qty(#) </label>
						</div>
						<div className="col-sm-2 header">
							<label> Total </label>
						</div>
					</div>
					{
						stock.map(function(record) {
							var r = <RowItem item={record} onUpdate={ref.update}/>;
							ref.keys.push(record.key);
							return r;
						})
					}	
					<div className="row">
						<div className="col-sm-2 col-sm-offset-8">
							<p className="text-success"> Total Cost </p>
						</div>
						<div className="col-sm-2">
							<p className="text-danger"> ${this.state.total}</p>
						</div>
					</div>
				</div>);
        }
      });
	  
	  module.exports = NavComponent;