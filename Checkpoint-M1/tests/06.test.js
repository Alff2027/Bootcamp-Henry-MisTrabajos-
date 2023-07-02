const {Stack} = require("../DS");
/* eslint-disable no-undef */
const {
  reverseWords
} = require('../checkpoint.js');

describe('EJERCICIO 6: reverseWords', function() {

  it('Debe devolver olleH dlroW cuando invoco reverseWords con Hello World', function() {
    expect(reverseWords("Hello World")).toEqual("olleH dlroW");
  });

  it('Debe devolver olleH dlroW cuando invoco reverseWords con Hello World', function() {
    expect(reverseWords("There is a little monkey")).toEqual("erehT si a elttil yeknom");
  });
});
