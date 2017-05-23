var qs = require('querystring');
var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var Text = require('../index');

var query = qs.parse(window.location.search.replace(/^\?/, ''));
var initial = query.t || fs.readFileSync(__dirname + '/sample.txt', 'utf-8');

var App = createReactClass({
  getInitialState: function() {
    return { text: initial };
  },

  _handleChange: function(e) {
    this.setState({ text: e.target.value });
  },

  render: function() {
    return (
      <div className="container">
        <h1>react-format-text</h1>

        <div className="row">
          <div className="col-md-6">
            <textarea
              value={this.state.text}
              onChange={this._handleChange}
              className="form-control" />
          </div>
          <div className="col-md-6">
            <div className="text">
              <Text>{this.state.text}</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
