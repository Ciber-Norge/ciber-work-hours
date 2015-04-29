'use strict';

var assert = require('should');
var workHours = require('../')('fi');

describe('Ciber Finland', function () {
    it('New Year\'s day is a day off', function () {
        workHours.calculate(new Date(2014, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2015, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2016, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2017, 0, 1)).should.equal(0);
    });

    it('Epiphany is a day off', function () {
        workHours.calculate(new Date(2014, 0, 6)).should.equal(0);
        workHours.calculate(new Date(2000, 0, 6)).should.equal(0);
        workHours.calculate(new Date(2015, 0, 6)).should.equal(0);
        workHours.calculate(new Date(2018, 0, 6)).should.equal(0);
    });

    it('Easter Monday is a day off', function () {
        workHours.calculate(new Date(1990, 3, 16)).should.equal(0);
        workHours.calculate(new Date(2016, 2, 28)).should.equal(0);
        workHours.calculate(new Date(2017, 3, 17)).should.equal(0);
        workHours.calculate(new Date(2018, 3,  2)).should.equal(0);
    });

    it('Ascension Day is a holiday', function () {
        workHours.calculate(new Date(2014, 4, 29)).should.equal(0, 'May 29 2014');
        workHours.calculate(new Date(2015, 4, 14)).should.equal(0, 'May 14 2015');
        workHours.calculate(new Date(2016, 4,  5)).should.equal(0, 'May  5 2016');
        workHours.calculate(new Date(2017, 4, 25)).should.equal(0, 'May 25 2017');
    });

    it('May Day is a public holiday', function () {
        workHours.calculate(new Date(2014, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2015, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2016, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2017, 4, 1)).should.equal(0);
    });

    it('Midsummer Eve is a public holiday', function () {
        workHours.calculate(new Date(2015, 5, 19)).should.equal(0);
        workHours.calculate(new Date(2016, 5, 24)).should.equal(0);
        workHours.calculate(new Date(2017, 5, 23)).should.equal(0);
    });

    it('Finnish Independence Day is a public holiday', function () {
        workHours.calculate(new Date(2015, 11, 6)).should.equal(0);
        workHours.calculate(new Date(2016, 11, 6)).should.equal(0);
        workHours.calculate(new Date(2017, 11, 6)).should.equal(0);
        workHours.calculate(new Date(2018, 11, 6)).should.equal(0);
    });

    it('Christmas Eve is a public holiday', function () {
        workHours.calculate(new Date(2015, 11, 24)).should.equal(0);
        workHours.calculate(new Date(2016, 11, 24)).should.equal(0);
        workHours.calculate(new Date(2017, 11, 24)).should.equal(0);
    });

    it('Christmas Day is a public holiday', function () {
        workHours.calculate(new Date(2014, 11, 25)).should.equal(0);
        workHours.calculate(new Date(2015, 11, 25)).should.equal(0);
        workHours.calculate(new Date(2016, 11, 25)).should.equal(0);
    });

    it('Second Day of Christmas is a public holiday', function () {
        workHours.calculate(new Date(2014, 11, 26)).should.equal(0);
        workHours.calculate(new Date(2015, 11, 26)).should.equal(0);
        workHours.calculate(new Date(2016, 11, 26)).should.equal(0);
    });

    it('All Fridays are not holidays', function () {
        workHours.calculate(new Date(2015, 4, 8)).should.equal(workHours.ruleset.regularHours);
    });
});
