var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var linkify = require('linkify-it')();
var tlds = require('tlds');

linkify.tlds(tlds);

var format = function(str, options) {
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
    var target = ('target' in options) ? options.target :
      ((/^http(s)?:/).test(match.url) ? '_blank' : null);
    var rel = ('rel' in options) ? options.rel :
      (target === '_blank' ? 'noopener noreferrer' : null);

    index = match.lastIndex;

    newlines(part, i);
    elements.push(<a key={i} target={target} rel={rel} href={match.url}>{match.text}</a>);
  });

  newlines(str.slice(index), matches.length);

  return elements;
};

module.exports = createReactClass({
  propTypes: {
    children: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string
  },

  render: function() {
    var text = this.props.children;

    return (
      <span>{text && format(text, this.props)}</span>
    );
  }
});
