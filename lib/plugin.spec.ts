﻿///<reference path='../typings/tsd.d.ts'/>
import chai = require('chai');
import plugin = require('./plugin');
var postcss = require('postcss');

var expect = chai.expect;

// ReSharper disable WrongExpressionStatement
describe('postcss-nested-props plugin', () => {

	it('unwraps a nested property', () => {
		check(
			'a{b:{c:d}}',
			'a{b-c:d}'
			);
	});

	it('unwraps deeply nested properties', () => {
		check(
			'a{b:{c:{d:{e:{f:g}}}}}',
			'a{b-c-d-e-f:g}'
		);
	});

	it('unwraps two nested properties in the same rule', () => {
		check(
			'a{b:{c:{d:e}}f:{g:{h:i}}}',
			'a{b-c-d:e;f-g-h:i}'
		);
	});

	it.skip('allows a property namespace itself to have a value', () => {
		check(
			'a{b:c{d:e}}',
			'a{b:c;b-d:e}'
		);
	});

});

function check(input: string, output: string) {
	var processor = postcss([plugin()]);
	expect(processor.process(input).css).to.equal(output);
}