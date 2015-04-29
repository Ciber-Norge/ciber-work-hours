'use strict';

var assert = require('should');
var workHours = require('../')('dk');

describe('Ciber Denmark', function () {
    it('New Year\'s day is a day off', function () {
        workHours.calculate(new Date(2014, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2015, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2016, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2017, 0, 1)).should.equal(0);
    });

    it('Should detect Munday Thursday as a day off', function () {
        workHours.calculate(new Date(2014, 3, 17)).should.equal(0);
    });

    it('Should detect Good Friday as a day off', function () {
        workHours.calculate(new Date(2014, 3, 18)).should.equal(0);
    });

    it('Easter Monday is a day off', function () {
        workHours.calculate(new Date(1990, 3, 16)).should.equal(0);
        workHours.calculate(new Date(2016, 2, 28)).should.equal(0);
        workHours.calculate(new Date(2017, 3, 17)).should.equal(0);
        workHours.calculate(new Date(2018, 3,  2)).should.equal(0);
    });

    it('Should detect General Prayer Day as a day off', function () {
        workHours.calculate(new Date(2014, 4, 16)).should.equal(0);
        workHours.calculate(new Date(2015, 4,  1)).should.equal(0);
        workHours.calculate(new Date(2016, 3, 22)).should.equal(0);
        workHours.calculate(new Date(2017, 4, 12)).should.equal(0);
    });

    it('Ascension Day is a holiday', function () {
        workHours.calculate(new Date(2014, 4, 29)).should.equal(0, 'May 29 2014');
        workHours.calculate(new Date(2015, 4, 14)).should.equal(0, 'May 14 2015');
        workHours.calculate(new Date(2016, 4,  5)).should.equal(0, 'May  5 2016');
        workHours.calculate(new Date(2017, 4, 25)).should.equal(0, 'May 25 2017');
    });
});
