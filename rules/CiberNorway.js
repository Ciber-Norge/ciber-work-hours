'use strict';

module.exports = function (easter, util) {
    return {
        daysOff: [
            /* CIBER SPECIAL */
            {month: 11, date: 24}, // Christmas eve
            {month: 11, date: 31}, // New year

            /* saturdays and sundays */
            {day: 6},
            {day: 0},

            /* common Norwegian holidays */
            {month: 0, date: 1}, // New year
            {month: 4, date: 1}, // First of may
            {month: 4, date: 17}, // Constitution day
            {month: 11, date: 25}, // First day of christmas
            {month: 11, date: 26}, // Second day of christmas
            {
                callback: function isPalmSunday(date) {
                    var palmSunday = util.addDays(easter, -7);
                    return util.sameDay(palmSunday, date);
                }
            },
            {
                callback: function isMundayThrusday(date) {
                    var palmSunday = util.addDays(easter, -3);
                    return util.sameDay(palmSunday, date);
                }
            },
            {
                callback: function isGoodFriday(date) {
                    var goodFriday = util.addDays(easter, -2);
                    return util.sameDay(goodFriday, date);
                }
            },
            {
                callback: function isFirstDayOfEaster(date) {
                    var firstDayOfEaster = util.addDays(easter, 0);
                    return util.sameDay(firstDayOfEaster, date);
                }
            },
            {
                callback: function isSecondDayOfEaster(date) {
                    var secondDayOfEaster = util.addDays(easter, 1);
                    return util.sameDay(secondDayOfEaster, date);
                }
            },
            {
                callback: function isAscensionDay(date) {
                    var ascensionDay = util.addDays(easter, 39);
                    return util.sameDay(ascensionDay, date);
                }
            },
            {
                callback: function isFirstPentecostDay(date) {
                    var firstPentecostDay = util.addDays(easter, 7 * 7);
                    return util.sameDay(firstPentecostDay, date);
                }
            },
            {
                callback: function isSecondPentecostDay(date) {
                    var secondPentecostDay = util.addDays(easter, 7 * 7 + 1);
                    return util.sameDay(secondPentecostDay, date);
                }
            }
        ],
        halfDays: [
            {
                callback: function isWednesdayBeforeMaundyThursday(date) {
                    var wednesday = util.addDays(easter, -4);
                    return util.sameDay(wednesday, date);
                },
                hours: 3.75
            }
        ]
    };
}
