var React = require('react');
var linkify = require('linkify-it')();
var tlds = require('tlds');

linkify.tlds(tlds);

var format = function(str) {
  var matches = linkify.match(str) || [];
  var index = 0;
  var elements = [];

  var newlines = function(str, i) {
    var parts = str.split(/\n|\r/);

    parts.forEach(function(part, j) {
      if(part) elements.push(part);
      if(j < parts.length - 1) elements.push(<br key={`${i}.${j}`} />);
    });
  };

  matches.forEach(function(match, i) {
    var part = str.slice(index, match.index);
    var target = (/^http(s)?:/).test(match.url) ? '_blank' : null;

    index = match.lastIndex;

    newlines(part, i);
    elements.push(<a key={i} target={target} href={match.url}>{match.text}</a>);
  });

  newlines(str.slice(index), matches.length);

  return elements;
};

module.exports = React.createClass({
  propTypes: {
    children: React.PropTypes.string
  },

  render: function() {
    var text = this.props.children;

    return (
      <span>{text && format(text)}</span>
    );
  }
});
