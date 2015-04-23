'use strict';

function find(array, condition) {
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i])) return array[i];
    }

    return null;
}

function easterForYear(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n0 = (h + l + 7 * m + 114)
    var n = Math.floor(n0 / 31) - 1;
    var p = n0 % 31 + 1;
    var date = new Date(year, n, p);
    return date;
}

function sameMonth(d1, d2) {
    return d1.getYear() === d2.getYear() && d1.getMonth() === d2.getMonth();
}

function sameDay(d1, d2) {
    return sameMonth(d1, d2) && d1.getDate() === d2.getDate();
}

function addDays(date, numDays) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numDays)
}

var fullDayHours = 7.5;

/**
 * Calculates work hours of a given day
 * Hard-coded for Ciber Norge AS
 */
function workHoursInDay(date) {
    var easter = easterForYear(date.getFullYear()); // Gives the easter sunday
    var ruleset = require('./rules/CiberNorway')(easter, {addDays: addDays, sameDay: sameDay});

    var dayOff = find(ruleset.daysOff, function (dayOff) {
        if (dayOff.year !== undefined && dayOff.month !== undefined && dayOff.date !== undefined) return sameDay(new Date(dayOff.year, dayOff.month, dayOff.date), date);
        if (dayOff.month !== undefined && dayOff.date !== undefined) return sameDay(new Date(date.getFullYear(), dayOff.month, dayOff.date), date);
        if (dayOff.day !== undefined) return dayOff.day === date.getDay();
        if (dayOff.callback !== undefined) return dayOff.callback(date);
    });

    var halfDay = find(ruleset.halfDays, function (halfDay) {
        if (halfDay.callback !== undefined) return halfDay.callback(date);
    });

    if (dayOff) {
        return 0;
    }

    if (halfDay) {
        return halfDay.hours;
    }

    return fullDayHours;
}

/**
 * Calculates working hours in the month of a given JavaScript Date.
 * @param date
 * @returns Number of working hours in the month
 */
function workHoursInMonth(date) {
    var current = new Date(date.getFullYear(), date.getMonth(), 1),
        last = new Date(date.getFullYear(), date.getMonth() + 1, 1),
        sum = 0;

    while (!sameDay(current, last)) {
        sum += workHoursInDay(current);

        current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
    }

    return sum;
}

module.exports = {
    calculate: workHoursInDay,
    inMonth: workHoursInMonth,
    getDefaultWorkDay: function () { return fullDayHours; }
};
