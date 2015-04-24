'use strict';

module.exports ={
    regularHours: 7.5,
    daysOff: [
        /* CIBER SPECIAL */
        {month: 11, date: 24, name: 'Julaften'}, // Christmas eve
        {month: 11, date: 31, name: 'Nyttårsaften'}, // New year

        /* saturdays and sundays */
        {day: 6, name: 'Lørdag'},
        {day: 0, name: 'Søndag'},

        /* common Norwegian holidays */
        {month: 0, date: 1, name: 'Første nyttårsdag'}, // New year
        {month: 4, date: 1, name: 'Arbeidernes dag'}, // First of may
        {month: 4, date: 17, name: 'Grunnlovsdagen'}, // Constitution day
        {month: 11, date: 25, name: 'Første juledag'}, // First day of christmas
        {month: 11, date: 26, name: 'Andre juledag'}, // Second day of christmas
        {reference: 'EASTER', offset: -7, name: 'Palmesøndag'},
        {reference: 'EASTER', offset: -3, name: 'Skjærtorsdag'},
        {reference: 'EASTER', offset: -2, name: 'Langfredag'},
        {reference: 'EASTER', offset:  0, name: 'Første påskedag'},
        {reference: 'EASTER', offset:  1, name: 'Andre påskedag'},
        {reference: 'EASTER', offset: 39, name: 'Kristi himmelfartsdag'},
        {reference: 'EASTER', offset: 49, name: 'Første Pinsedag'},
        {reference: 'EASTER', offset: 50, name: 'Andre pinsedag'},
    ],
    halfDays: [
        {reference: 'EASTER', offset: -4, name: 'Onsdag før skjærtorsdag', hours: 3.75}
    ]
};
