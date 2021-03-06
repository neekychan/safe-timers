'use strict';

const test = require('tape');
const timers = require('..');

test('setInterval', function (t) {
	const originalMaxInterval = timers.maxInterval;

	t.test('Crossing the maxInterval border', function (t) {
		timers.maxInterval = 2;

		const interval = timers.setInterval(function () {
			timers.maxInterval = originalMaxInterval;
			interval.clear();

			t.pass('interval fired');
			t.equal(arguments.length, 0);
			t.end();
		}, 30);
	});

	t.test('Crossing the maxInterval border is fired multiple times', function (t) {
		timers.maxInterval = 2;

		let callCount = 0;
		const interval = timers.setInterval(function () {
			callCount++;

			t.pass('interval fired ' + callCount + ' times');
			t.equal(arguments.length, 0);

			if (callCount === 2) {
				timers.maxInterval = originalMaxInterval;
				interval.clear();

				t.end();
			}
		}, 30);
	});

	t.test('Crossing the maxInterval border with args', function (t) {
		timers.maxInterval = 2;

		const interval = timers.setInterval(function (a, b) {
			timers.maxInterval = originalMaxInterval;
			interval.clear();

			t.pass('interval fired');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);
			t.end();
		}, 30, 1, 2);
	});

	t.test('Crossing the maxInterval border with args is fired multiple times', function (t) {
		timers.maxInterval = 2;

		let callCount = 0;
		const interval = timers.setInterval(function (a, b) {
			callCount++;

			t.pass('interval fired ' + callCount + ' times');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);

			if (callCount === 2) {
				timers.maxInterval = originalMaxInterval;
				interval.clear();

				t.end();
			}
		}, 30, 1, 2);
	});

	t.test('Not crossing the maxInterval border', function (t) {
		const interval = timers.setInterval(function () {
			interval.clear();

			t.pass('interval fired');
			t.equal(arguments.length, 0);
			t.end();
		}, 5);
	});

	t.test('Not crossing the maxInterval border is fired multiple times', function (t) {
		let callCount = 0;
		const interval = timers.setInterval(function () {
			callCount++;

			t.pass('interval fired ' + callCount + ' times');
			t.equal(arguments.length, 0);

			if (callCount === 2) {
				timers.maxInterval = originalMaxInterval;
				interval.clear();

				t.end();
			}
		}, 5);
	});

	t.test('Not crossing the maxInterval border with args', function (t) {
		const interval = timers.setInterval(function (a, b) {
			interval.clear();

			t.pass('interval fired');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);
			t.end();
		}, 5, 1, 2);
	});

	t.test('Not crossing the maxInterval border with args with fired multiple times', function (t) {
		let callCount = 0;
		const interval = timers.setInterval(function (a, b) {
			callCount++;

			t.pass('interval fired ' + callCount + ' times');
			t.equal(arguments.length, 2);
			t.equal(a, 1);
			t.equal(b, 2);

			if (callCount === 2) {
				timers.maxInterval = originalMaxInterval;
				interval.clear();

				t.end();
			}
		}, 5, 1, 2);
	});

	t.test('clear()', function (t) {
		const interval = timers.setInterval(function () {
			t.end('interval fired despite clear()');
		}, 0);

		interval.clear();

		setTimeout(function () {
			t.pass('interval did not fire');
			t.end();
		}, 10);
	});

	t.test('clearInterval', function (t) {
		const interval = timers.setInterval(function () {
			t.end('interval fired despite clearInterval()');
		}, 0);

		timers.clearInterval(interval);

		setTimeout(function () {
			t.pass('interval did not fire');
			t.end();
		}, 10);
	});

	t.test('clearInterval without timer', function (t) {
		timers.clearInterval(null);
		t.pass('no error was thrown');
		t.end();
	});

	t.end();
});
