'use strict';

var assert = require('should');
var workHours = require('../')('no');

describe('Ciber Norway', function () {
    it('Christmas is a day off', function () {
        workHours.calculate(new Date(2014, 11, 24)).should.equal(0);
    });

    it('First day of Chrirstmas is a day off', function () {
        workHours.calculate(new Date(2014, 11, 25)).should.equal(0);
    });

    it('Second day of Christmas is a day off', function () {
        workHours.calculate(new Date(2014, 11, 26)).should.equal(0);
    });

    it('New-years is a day off', function () {
        workHours.calculate(new Date(2014, 11, 31)).should.equal(0);
        workHours.calculate(new Date(2015, 11, 31)).should.equal(0);
        workHours.calculate(new Date(1999, 11, 31)).should.equal(0);
        workHours.calculate(new Date(2022, 11, 31)).should.equal(0);
        workHours.calculate(new Date(2010, 11, 31)).should.equal(0);
    });

    it('First day of the year is a day off', function () {
        workHours.calculate(new Date(2015, 0, 1)).should.equal(0);
        workHours.calculate(new Date(1999, 0, 1)).should.equal(0);
        workHours.calculate(new Date(1998, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2009, 0, 1)).should.equal(0);
        workHours.calculate(new Date(2022, 0, 1)).should.equal(0);
    });

    it('Second day of 2015 is a working day', function () {
        workHours.calculate(new Date(2015, 0, 2)).should.equal(7.5);
    });

    it('The weekend of January 17 and 18 in 2015 are days off', function () {
        workHours.calculate(new Date(2015, 0, 17)).should.equal(0);
        workHours.calculate(new Date(2015, 0, 18)).should.equal(0);
    });

    it('The week of November 4th through 10th 2019 is a 5-day working week with a weekend', function () {
        workHours.calculate(new Date(2019, 10, 4)).should.equal(7.5, 'Monday');
        workHours.calculate(new Date(2019, 10, 5)).should.equal(7.5, 'Tuesday');
        workHours.calculate(new Date(2019, 10, 6)).should.equal(7.5, 'Wednesday');
        workHours.calculate(new Date(2019, 10, 7)).should.equal(7.5, 'Thursday');
        workHours.calculate(new Date(2019, 10, 8)).should.equal(7.5, 'Friday');
        workHours.calculate(new Date(2019, 10, 9)).should.equal(0, 'Saturday');
        workHours.calculate(new Date(2019, 10, 10)).should.equal(0, 'Sunday');
    });

    it('Should detect palm sundays as days off', function () {
        workHours.calculate(new Date(2014, 3, 13)).should.equal(0);
        workHours.calculate(new Date(2015, 2, 29)).should.equal(0);
        workHours.calculate(new Date(2016, 2, 20)).should.equal(0);
        workHours.calculate(new Date(2017, 3, 9)).should.equal(0);
        workHours.calculate(new Date(2018, 2, 25)).should.equal(0);
        workHours.calculate(new Date(2019, 3, 14)).should.equal(0);
        workHours.calculate(new Date(2020, 3, 5)).should.equal(0);
    });

    it('Should detect the monday after palm sundays as working days', function () {
        workHours.calculate(new Date(2014, 3, 14)).should.equal(7.5);
        workHours.calculate(new Date(2015, 2, 30)).should.equal(7.5);
        workHours.calculate(new Date(2016, 2, 21)).should.equal(7.5);
        workHours.calculate(new Date(2017, 3, 10)).should.equal(7.5);
        workHours.calculate(new Date(2018, 2, 26)).should.equal(7.5);
        workHours.calculate(new Date(2019, 3, 15)).should.equal(7.5);
        workHours.calculate(new Date(2020, 3, 6)).should.equal(7.5);
    });

    it('Should detect Wednesday before Munday Thursday as a half day', function () {
        workHours.calculate(new Date(2016, 2, 23)).should.equal(3.75);
        workHours.calculate(new Date(2014, 3, 16)).should.equal(3.75);
    });

    it('Should detect Munday Thursday as a day off', function () {
        workHours.calculate(new Date(2014, 3, 17)).should.equal(0);
    });

    it('Should detect Good Friday as a day off', function () {
        workHours.calculate(new Date(2014, 3, 18)).should.equal(0);
    });

    it('Should detect second day of Easter as a day off', function () {
        workHours.calculate(new Date(2014, 3, 21)).should.equal(0);
    });

    it('Should detect ascension day as a day off', function () {
        workHours.calculate(new Date(2014, 4, 29)).should.equal(0);
        workHours.calculate(new Date(2000, 5,  1)).should.equal(0);
        workHours.calculate(new Date(2020, 4, 21)).should.equal(0);
    });

    it('Should detect Pentecost day as a day off (always a Sunday anyway...)', function () {
        workHours.calculate(new Date(2014, 5, 8)).should.equal(0);
    });

    it('Should detect second day of Pentecost as a day off', function () {
        workHours.calculate(new Date(2014, 5, 9)).should.equal(0);
        workHours.calculate(new Date(2015, 4, 24)).should.equal(0);
        workHours.calculate(new Date(2016, 4, 15)).should.equal(0);
    });

    it('Should detect day after second day of Pentecost as a normal day', function () {
        workHours.calculate(new Date(2014, 5, 10)).should.equal(7.5);
    });

    it('Should detect Friday June 6 2014 as a regular day', function () {
        workHours.calculate(new Date(2014, 5, 6)).should.equal(7.5);
    });

    it('Should detect Constitution Day as a day off', function () {
        workHours.calculate(new Date(2014, 4, 17)).should.equal(0);
        workHours.calculate(new Date(2015, 4, 17)).should.equal(0);
        workHours.calculate(new Date(2016, 4, 17)).should.equal(0);
        workHours.calculate(new Date(2017, 4, 17)).should.equal(0);
    });

    it('Should detect Labour Day as a day off', function () {
        workHours.calculate(new Date(2014, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2015, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2017, 4, 1)).should.equal(0);
        workHours.calculate(new Date(2016, 4, 1)).should.equal(0);
    });
});
