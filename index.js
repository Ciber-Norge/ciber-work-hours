'use strict';

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function find(array, condition) {
    if (array && array.length) {
        for (var i = 0; i < array.length; i++) {
            if (condition(array[i])) return array[i];
        }
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

var premadeRulesets = {
    /* insert: rulesets */
};

module.exports = function (ruleset) {
    if (typeof ruleset === 'string') {
        if (isEmpty(premadeRulesets)) {
            /* dev: rulesets are not injected */
            ruleset = require('js-yaml').load(require('fs').readFileSync('./rules/' + ruleset + '.yaml'));
        } else {
            ruleset = premadeRulesets[ruleset];
        }
    }
    // Assume well-formatted ruleset

    /**
     * Calculates work hours of a given day
     * Hard-coded for Ciber Norge AS
     */
    function workHoursInDay(date) {
        var easter = easterForYear(date.getFullYear()); // Gives the easter sunday

        function isRuleApplicable(rule) {
            if (rule.date !== undefined && rule.month !== undefined) {
                if (rule.year !== undefined) {
                    return sameDay(new Date(rule.year, rule.month, rule.date), date);
                }
                return sameDay(new Date(date.getFullYear(), rule.month, rule.date), date);
            }
            if (rule.day !== undefined) return rule.day === date.getDay();
            if (rule.reference !== undefined) {
                if (rule.reference === 'EASTER') {
                    return sameDay(addDays(easter, rule.offset || 0), date);
                }
            }
        }

        var dayOff = find(ruleset.daysOff, isRuleApplicable);

        if (dayOff) {
            return 0;
        }

        var halfDay = find(ruleset.halfDays, isRuleApplicable);

        if (halfDay) {
            return halfDay.hours;
        }

        return ruleset.regularHours;
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

    return {
        calculate: workHoursInDay,
        inMonth: workHoursInMonth,
        ruleset: ruleset
    };
};
