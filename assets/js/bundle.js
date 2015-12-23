(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var audio = document.querySelector('audio');
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioSource = audioContext.createMediaElementSource(audio);
var analyser = audioContext.createAnalyser();
var frequencyData = new Uint8Array(200);

audioSource.connect(analyser);
audioSource.connect(audioContext.destination);

var height = window.screen.height / 3;
var width = window.screen.width - 200;
var bar = '1';
var visualizer = d3.select('#visualizer').append('svg').attr('height', height).attr('width', width);

visualizer.selectAll('rect').data(frequencyData).enter().append('rect').attr('x', function (d, i) {
  return i * (width / frequencyData.length);
}).attr('width', width / frequencyData.length - bar);

function updateVisualizer() {
  window.requestAnimationFrame(updateVisualizer);
  analyser.getByteFrequencyData(frequencyData);

  visualizer.selectAll('rect').data(frequencyData).attr('y', function (d) {
    return height - d;
  }).attr('height', function (d) {
    return d;
  }).attr('fill', function (d) {
    return 'rgb(' + d + ', ' + (d - 100) + ', ' + (d - 50) + ')';
  });
}

updateVisualizer();

},{}]},{},[1]);
