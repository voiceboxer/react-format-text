# react-format-text

React component for formatting newlines and links. See the [live demo](https://voiceboxer.github.io/react-format-text/demo/index.html).

	npm install react-format-text

# Usage

Newlines are converted to `<br>` elements and words looking like URLs are replaced with appropriate `<a>` elements.

```javascript
var React = require('react');
var Text = require('react-format-text');

var App = React.createClass({
	render: function() {
		return <Text>{'Hello\nhttp://example.com'}</Text>;
	}
});
```
