'use strict';

var assert = require('should');
var workHours = require('../');

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
        workHours.calculate(new Date(2019, 10, 4)).should.equal(7.5);
        workHours.calculate(new Date(2019, 10, 5)).should.equal(7.5);
        workHours.calculate(new Date(2019, 10, 6)).should.equal(7.5);
        workHours.calculate(new Date(2019, 10, 7)).should.equal(7.5);
        workHours.calculate(new Date(2019, 10, 8)).should.equal(7.5);
        workHours.calculate(new Date(2019, 10, 9)).should.equal(0);
        workHours.calculate(new Date(2019, 10, 10)).should.equal(0);
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
    /**
     Testing this:

     1) Copy-paste this scope (the file) into developer tools.
     2) Copy paste the test command:

     //<editor-fold dec="TEST COMMAND">
     var tests = [
         ///// Easter
         ['workHours.calculate(new Date(2016, 2, 23))', 3.75],  // Wednesday March 23 2016 half day
         ['workHours.calculate(new Date(2014, 3, 16))', 3.75],  // Wednesday April 16 2014 half day
         ['workHours.calculate(new Date(2014, 3, 17))', 0],     // Thursday April 17 2014 (munday thursday) off
         ['workHours.calculate(new Date(2014, 3, 18))', 0],     // Friday April 18 2014 (good day) off
         ['workHours.calculate(new Date(2014, 3, 21))', 0],     // Monday April 21 2014 (second day of easter) off

         ['workHours.calculate(new Date(2014, 4, 29))', 0],     // Thursday May 29 2014 (ascension day) off

         ['workHours.calculate(new Date(2014, 5, 8))', 0],      // Sunday June 8 2014 (ascension day) off
         ['workHours.calculate(new Date(2014, 5, 9))', 0],      // Monday June 9 2014 (second day of pentecost) off
         ['workHours.calculate(new Date(2014, 5, 10))', 7.5],   // Tuesday June 10 2014 regular day
         ['workHours.calculate(new Date(2014, 5, 6))', 7.5]     // Friday June 6 2014 regular day
     ];
     var err = false;
     _.forEach(tests, function (test) {
        var expr = test[0], expected = test[1];
        var result = eval(expr);
        if (result !== expected) {
            err = true;
            console.log('ERROR test failed. Expected "' + expected + '", but received "' + result + '". [' + expr + ']');
        }
     });
     if (!err) console.log('All tests passed OK.');
     //</editor-fold>
     */
});
