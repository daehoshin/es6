const moment = require('moment-timezone');

const a = moment.tz([2016, 3, 27, 9, 19], 'America/Los_angeles').toDate();
const s = moment.tz([2016, 3, 27, 9, 19], 'Asia/Seoul').toDate();

console.log(a);
console.log(s);

const d = new Date(Date.UTC(1930, 4, 10));

// 다음 결과는 로스앤젤리스에 사는 사람 기준
console.log(d.toLocaleDateString());     // "5/9/1930"
console.log(d.toLocaleTimeString());     // "4:00:00 PM"
console.log(d.toTimeString());           // "17:00:00 GMT-0700 (Pacific Daylight Time)"
console.log(d.toUTCString());            // "Sat, 10 May 1930, 00:00:00 GMT"

console.log(moment(d).format("YYYY-MM-DD"));                 // "1930-05-10"
console.log(moment(d).format("YYYY-MM-DD HH:mm"));           // "1930-05-10"
console.log(moment(d).format("YYYY-MM-DD HH:mm Z"));         // "1930-05-10"
console.log(moment(d).format("YYYY-MM-DD HH:mm [UTC]Z"));    // "1930-05-10"
console.log(moment(d).format("YYYY년 M월 D일 HH:mm"));       // "1930년 5월 10일 08:00"

console.log(moment(d).format("dddd, MMMM [the] Do, YYYY")); // "Friday, May the 9th, 1930"

console.log(moment(d).format("YYYY-MM-DD")); // "5:00 pm"

const t = new Date(Date.UTC(1815, 9, 10));

// 다음 결과는 로스앤젤리스 기준
console.log(t.getFullYear());           // 1815
console.log(t.getMonth());              // 9
console.log(t.getDate());               // 10
console.log(t.getDay());                // 2
console.log(t.getHours());              // 8
console.log(t.getMinutes());            // 38
console.log(t.getSeconds());            // 58
console.log(t.getMilliseconds());       // 0

// UTC 기준 메서드
console.log(t.getUTCFullYear());        // 1815
console.log(t.getUTCMonth());           // 9
console.log(t.getUTCDate());            // 10