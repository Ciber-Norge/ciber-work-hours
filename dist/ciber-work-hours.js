require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ciber-work-hours":[function(require,module,exports){
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

function dateInRange(first, last, date) {
    return date >= first && last >= date;
}

var premadeRulesets = {
    "dk":{"regularHours":7.5,"daysOff":[{"day":6,"name":"Lørdag"},{"day":0,"name":"Søndag"},{"month":0,"date":1,"name":"Første nyttårsdag"},{"month":11,"date":25,"name":"Første juledag"},{"month":11,"date":26,"name":"Andre juledag"},{"reference":"EASTER","offset":-7,"name":"Palmesøndag"},{"reference":"EASTER","offset":-3,"name":"Skjærtorsdag"},{"reference":"EASTER","offset":-2,"name":"Langfredag"},{"reference":"EASTER","offset":0,"name":"Første påskedag"},{"reference":"EASTER","offset":1,"name":"Andre påskedag"},{"reference":"EASTER","offset":26,"name":"Store bededag"},{"reference":"EASTER","offset":39,"name":"Kristi himmelfartsdag"},{"reference":"EASTER","offset":49,"name":"Første Pinsedag"},{"reference":"EASTER","offset":50,"name":"Andre pinsedag"},{"month":5,"date":5,"name":"Grundlovsdag"}]},
"fi":{"regularHours":8,"daysOff":[{"day":6,"name":"Lørdag"},{"day":0,"name":"Søndag"},{"month":0,"date":1,"name":"Uudenvuodenpäivä"},{"month":0,"date":6,"name":"Loppiainen"},{"reference":"EASTER","offset":-2,"name":"Pitkäperjantai"},{"reference":"EASTER","offset":1,"name":"2. pääsiäispäivä"},{"month":4,"date":1,"name":"Vappu"},{"reference":"EASTER","offset":39,"name":"Helatorstai"},{"day":5,"first":{"month":5,"date":19},"last":{"month":5,"date":25},"name":"Juhannusaatto"},{"month":11,"date":6,"name":"Itsenäisyyspäivä"},{"month":11,"date":24,"name":"Jouluaatto"},{"month":11,"date":25,"name":"Joulupäivä"},{"month":11,"date":26,"name":"Tapaninpäivä"}]},
"no":{"regularHours":7.5,"daysOff":[{"month":11,"date":24,"name":"Julaften"},{"month":11,"date":31,"name":"Nyttårsaften"},{"day":6,"name":"Lørdag"},{"day":0,"name":"Søndag"},{"month":0,"date":1,"name":"Første nyttårsdag"},{"month":4,"date":1,"name":"Arbeidernes dag"},{"month":4,"date":17,"name":"Grunnlovsdagen"},{"month":11,"date":25,"name":"Første juledag"},{"month":11,"date":26,"name":"Andre juledag"},{"reference":"EASTER","offset":-7,"name":"Palmesøndag"},{"reference":"EASTER","offset":-3,"name":"Skjærtorsdag"},{"reference":"EASTER","offset":-2,"name":"Langfredag"},{"reference":"EASTER","offset":0,"name":"Første påskedag"},{"reference":"EASTER","offset":1,"name":"Andre påskedag"},{"reference":"EASTER","offset":39,"name":"Kristi himmelfartsdag"},{"reference":"EASTER","offset":49,"name":"Første Pinsedag"},{"reference":"EASTER","offset":50,"name":"Andre pinsedag"}],"halfDays":[{"reference":"EASTER","offset":-4,"name":"Onsdag før skjærtorsdag","hours":3.75}]},
"se":{"regularHours":8,"daysOff":[{"day":6,"name":"Lørdag"},{"day":0,"name":"Søndag"},{"month":0,"date":1,"name":"Nyårsdagen"},{"month":0,"date":6,"name":"Trettonedag jul"},{"reference":"EASTER","offset":1,"name":"Annendag Påsk"},{"reference":"EASTER","offset":39,"name":"Kristi himmelsfärds dag"},{"month":4,"date":1,"name":"Första maj"},{"month":5,"date":6,"name":"Sveriges nationaldag"},{"month":11,"date":25,"name":"Juldagen"},{"month":11,"date":26,"name":"Annandag jul"},{"day":5,"first":{"month":5,"date":19},"last":{"month":5,"date":25},"name":"midsommarafton"},{"month":11,"date":24,"name":"Julafton"},{"month":11,"date":31,"name":"Nyårsafton"}]},
};

module.exports = function (ruleset) {
    if (typeof ruleset === 'string') {
        if (isEmpty(premadeRulesets)) {
            /* dev: rulesets are not injected */
            ruleset = require('js' + '-yaml').load(
                require('f' + 's').readFileSync('./rules/' + ruleset + '.yaml')
            );
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
            if (rule.day !== undefined) {
                if (rule.day === date.getDay()) {
                    if (rule.first !== undefined && rule.last !== undefined) {
                        var firstDate = new Date(date.getFullYear(), rule.first.month, rule.first.date);
                        var lastDate = new Date(date.getFullYear(), rule.last.month, rule.last.date);
                        return dateInRange(firstDate, lastDate, date);
                    }
                    return rule.day === date.getDay();
                }
            }
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

},{}]},{},["ciber-work-hours"]);
