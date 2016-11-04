# react-format-text

React component for formatting newlines and links. See the [live demo](https://voiceboxer.github.io/react-format-text/demo/index.html).

	npm install react-format-text

# Usage

Newlines are converted to `<br>` elements and words looking like URLs are replaced with appropriate `<a>` elements. By default all absolute links have `target` set to `_blank` and `rel` to `noopener noreferrer`. It's possible to override this by passing the `target` and `rel` property to the component.

```javascript
var React = require('react');
var Text = require('react-format-text');

var App = React.createClass({
	render: function() {
		return <Text>{'Hello\nhttp://example.com'}</Text>;
	}
});
```
