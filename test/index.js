var test = require('tape');
var jsdom = require('jsdom');
var React = require('react');
var ReactTestUtils = require('react-dom/test-utils');
var ReactDOM = require('react-dom');

var Text = require('../index');

var document = jsdom.jsdom('<html><body></body></html>');
var window = document.defaultView;

global.document = document;
global.window = window;
global.navigator = window.navigator;

var textContent = function(el) {
  var node = null;
  var result = [];
  var walker = document.createTreeWalker(el, window.NodeFilter.SHOW_TEXT, null, false);

  while(node = walker.nextNode()) result.push(node.nodeValue);
  return result;
};

test('no text', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text></Text>
  );

  var element = ReactDOM.findDOMNode(text);

  t.equal(element.tagName, 'SPAN');
  t.equal(element.textContent, '');
  t.deepEqual(element.children, []);

  t.end();
});

test('plain text', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text>{'Hello World'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(element.querySelectorAll('br').length, 0);
  t.equal(element.querySelectorAll('a').length, 0);
  t.deepEqual(contents, ['Hello World']);

  t.end();
});

test('text with newline', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text>{'Hello\nWorld'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(element.querySelectorAll('br').length, 1);
  t.deepEqual(contents, ['Hello', 'World']);

  t.end();
});

test('text with link', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text>{'Hello http://example.com World'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var a = element.querySelectorAll('a');
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(a.length, 1);
  t.equal(a[0].textContent, 'http://example.com');
  t.ok(/^http:\/\/example.com/.test(a[0].href), 'should match');
  t.equal(a[0].target, '_blank');
  t.equal(a[0].rel, 'noopener noreferrer');
  t.deepEqual(contents, ['Hello ', 'http://example.com', ' World']);

  t.end();
});

test('text with email link', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text>{'Hello name@example.com World'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var a = element.querySelectorAll('a');
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(a.length, 1);
  t.equal(a[0].textContent, 'name@example.com');
  t.ok(/^mailto:name@example.com/.test(a[0].href), 'should match');
  t.notOk(a[0].target);
  t.deepEqual(contents, ['Hello ', 'name@example.com', ' World']);

  t.end();
});

test('text with newlines and link', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text>{'Hello\nhttp://example.com\nWorld'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var a = element.querySelectorAll('a');
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(element.querySelectorAll('br').length, 2);
  t.equal(a.length, 1);
  t.equal(a[0].textContent, 'http://example.com');
  t.ok(/^http:\/\/example.com/.test(a[0].href), 'should match');
  t.equal(a[0].target, '_blank');
  t.equal(a[0].rel, 'noopener noreferrer');
  t.deepEqual(contents, ['Hello', 'http://example.com', 'World']);

  t.end();
});

test('text with link and provided props', function(t) {
  var text = ReactTestUtils.renderIntoDocument(
    <Text target="_self" rel="external">{'http://example.com'}</Text>
  );

  var element = ReactDOM.findDOMNode(text);
  var a = element.querySelectorAll('a');
  var contents = textContent(element);

  t.equal(element.tagName, 'SPAN');
  t.equal(a.length, 1);
  t.equal(a[0].textContent, 'http://example.com');
  t.ok(/^http:\/\/example.com/.test(a[0].href), 'should match');
  t.equal(a[0].target, '_self');
  t.equal(a[0].rel, 'external');
  t.deepEqual(contents, ['http://example.com']);

  t.end();
});
