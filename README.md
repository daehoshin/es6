# es6
###chapter 9 - 객체와 객체지향 프로그래밍

> for...in 

* 루프에는 키가 심볼인 프로퍼티는 포함되지 않는다.
    
```
const SYM = Symbol();

const o = { a: 1,b: 2, c:3, [SYM]:4};

for(let prop in o) {
    if (!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
}
```

> Object.keys 

- Object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환합니다.
- [사용 예시](http://blog.nekoromancer.kr/2014/07/03/javascript%EC%9D%98-object%EB%A5%BC-%EB%8B%A4%EB%A3%A8%EB%8A%94-%EB%AA%87%EA%B0%80%EC%A7%80-%ED%8C%81%EB%93%A4/)
    
```
const SYM = Symbol();

const o = { a: 1,b: 2, c:3, [SYM]:4};

Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));
```

- 응용 : x로 시작하는 프로퍼티는?

```
const o = { apple : 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5,};

Object.keys(o).filter(prop=>prop.match(/^x/)).forEach(prop=>console.log(`${prop}: ${o[prop]}`));

```

> 클래스 및 인스턴스 생성

- 자동차 클래스 생성, 인스턴스화, 클래스 확인, 생성자, 기어 변속

```
// 클래스 생성
class Car() {
    constructor() {
    
    }
}

// 인스턴스화
const car1 = new Car();
const car2 = new Car();

// 클래스 타입 확인
car1 instanceof Car // true;
car2 instanceof Array // false;

// 클래스 생성
class Car {
    // 생성자 사용하여 초기화
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ['P','N','R','D'];
        this.userGear = this.userGears[0];
    }
    // 기어변속
    shift(gear) {
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${grear}`);
        this.userGear = gear;
    }
}
```
- userGear에 직접 접근하여 수정할 수 있으므로 다음과 같이 변경

    - _는 가짜 접근 제한 한것
    
```
// 클래스 생성
class Car {
    // 생성자 사용하여 초기화
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ['P','N','R','D'];
        this._userGear = this.userGears[0];
    }
    get userGear() { return this._userGear;}
    set userGear(value) {
        if(this._userGears.indexOf(value) < 0)
                    throw new Error(`Invalid gear: ${value}`);
                this._userGear = value;
    }
    // 기어변속
    shift(gear) {
        this._userGear = gear;
    }
}
``` 

- 스코프를 이용해 보호하는 WeakMap 인스턴스 사용

```
const Car = (function(){
    const carProps = new WeakMap();
    
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P','N','R','D'];
            carProps.set(this, {userGear : this._userGears[0]});
        }
        get userGear() {return carProps.get(this).userGear;}
        set userGear(value) {
            if(this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear : ${value}`);
            carProps.get(this).userGear = value;
        }
        
        shift(grear) {this.userGear = gear;}
        
    }
    
    return Car;
})();
```

> 클래스는 함수다

```
// ES5
function Car(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ['P','N','R','D'];
    this._userGear = this.userGears[0];
}
// ES6
class Es6Car {}
function Es5Car {}

// 둘다 함수
typeof Es6Car;
typeof Es5Car;

```

> 프로토 타입

```
const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift; // true
car1.shift('D');
car1.shift('d');    // error
car1.userGear;  // 'D'
car1.shift === car2.shift   // true

car1.shift = function(gear) {this.userGear = gear.toUpperCase();}
car1.shift === Car.prototype.shift; // false;
car1.shift === car2.shift;  // false;
car.shift('d');
car1.userGear;  // 'D'
```

> 정적 메서드

this 키워드 대신 클래스 이름을 사용하는 것이 좋다

[더 자세한 설명](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)

###chapter 10 - 맵과 셋

> Map

1. new 키워드로 생성

    const userRoles = new Map();
    
1. get 으로 호출
    
    userRoles.get("key");
    
1. has로 확인

    userRoles.has("key"");  // true or false;

1. set은 값의 교체

1. userRoles.size

1. keys()는 맵의 키, values()는 맵의 값, entries()는 배열을 리턴, 확산 연산자 가능(...userRoles.values())

1. 맵의 요소를 지울때는 delete(), 모두 지울때는 clear();

> WeakMap

1. 특징

    1. 키는 반드시 객체
    
    1. WeakMap의 키는 가비지 콜렉션에 포함될 수 있다
     
    1. WeakMap은 이터레이블이 아니며 clear() 메서드도 없다 
    
> Set

1. 중복 허용 (X)

1. size 제공, delete로 제거시 제거 됐다면 true 아니면 false

> WeakSet

1. 이터러블 아님, 가비지 컬렉션의 대상이 됨

###chapter 11 - 예외와 예외 처리

> Error 객체

    - new 키워드로 호출
    - 생성자에 message 파라미터 전달해 생성 가능
    
        ex) const err = new Error('invalid email');
        
    - message 프로퍼티에 메시지 있음 (err.message)
     
> try/catch와 예외처리

    - 예상치 못한 에러에 대처
    
    - try 블록 안에서 난 에러는 catch 블록을 수행 후 catch 이후 로직 진행
    
> 에러 일으키기
    
    - 에러를 직접 발생 (이후 로직 진행 안함)
    
        ex) throw new Error("에러 발생")
        
    - 호출 스택(콜 스택)
    
        1. a함수 안에 b함수 안에 c함수가 실행 되고 있을때 a, b함수는 완료되지 않고 쌓이는 현상
        
        1. c에서 에러가 난다면 catch 될때까지 위로 올라간다(b->a)
        
        1. 에러는 호출 스택 어디서든 캐치 가능
        
        1. a함수 안에 b함수 안에 c함수 안에 에러가 발생했다면
        
            - c에서 발생한 에러 보고
            
            - b가 c를 호출했고, a가 b를 호출했다는 정보도 알려줌

```
function a(){
    console.log('a: calling b');
    b();
    console.log('a: done');
}
function b(){
    console.log('b: calling c');
    c();
    console.log('b: done');
}
function c(){
    console.log('c: throing error');
    new throw Error('c error');
    console.log('c: done');
}
function d() {
    console.log('d: calling c');
    c();
    console.log('d: done');
}

try {
    a();
} catch(err) {
    console.log(err.stack);
}

try {
    d();
} catch(err) {
    console.log(err.stack);
}

```

> try...catch...finally

    - http 연결이나 file 같은 자원을 처리할때 에러 발생시 그 자원을 해제해야 하는 일이 있을것이다
    - 그때 사용하는게 finally 구문이다
    
###chapter 12 - 이터레이터와 제너레이터

- 지금 어디에 있는지 파악할 수 있다.
- 읽기 시작 : next(), 값 : value, 다 읽음 done()

> 이터레이블 프로토콜

- 이터레이블 프로토콜을 통해 모든 객체를 이터레이블 객체로 바꿀수 있다.

```
class Log {
	  constructor() {
		this.messages = [];
	  }  
	  add(message) {
		this.messages.push({message, timestamp: Date.now()});
	  }
	  [Symbol.iterator]() {
		return this.messages.values();
	  }
	}

	const log = new Log();
	log.add("test1");
	log.add("test2");
	log.add("test3");

	for (let entry of log )
	{
		console.log(`${entry.message}`);
	}
```

> 제너레이터

- 자신의 실행을 제어하는 함수
- 제너레이터는 언제든지 호출자에게 제어권을 넘길수 있다(yield)
- 제너레이터는 호출한 즉시 실행되지 않는다
- 제너레이터는 이터레이터를 반환하고 이터레이터의 next 메서드를 호출함에 따라 실행된다.

```
	function* rainbow() {
		yield 'red';
		yield 'orange';
		yield 'yellow';
		yield 'green';
		yield 'blue';
		yield 'indigo';
		yield 'violet';
	}
	const it = rainbow();
	for(let color of it)
	{
		console.log(color);
	}
```

> yield 표현식과 양방향 통신

1. 제너레이터에서 next() 실행시 첫번째 행 수행
1. 첫번째 행에 yield 표현식이 있기때문에 제어권을 호출자에게 넘김
1. 호출자가 다시 next()를 실행해야 첫번째 행이 완료
1. 첫번째 행에는 호출자의 next에 파라미터를 실어서 전달

```
function* interrogate() {                                   // let it = interrogate();
    let name = yield "What is your name?";                  // it.next();
    let color = yield "what is your favorite color?";       // it.next("daehoshin");
    return `${name}`s favorite color is ${color}.`;         // it.next("blue");
}

```

1. 제너레이터는 이터레이터를 반환하고 일시 정지한 상태로 시작 
1. undefined를 제너레이터에 넘김
    1. 제너레이터는 What is your name?을 넘기고 일시 정지
1. it.next("daehoshin")실행
    1. "daehoshin"을 제너레이터에 넘김
    1. 제너레이터는 What is your favorite color?를 넘기고 일시정지
1. it.next("blue")실행
    1. "blue"를 제너레이터에 넘김
    1. 제너레이터는 What is your favorite color?를 넘기고 일시정지
    
※ 제너레이터는 화살표 표기법으로 만들수 없다 ()->{} X, function* 을 반드시 써야한다.

> 제너레이터와 리턴

- 리턴문의 value는 출력되지 않는다.

```
function* abc(){
    yield 'a';
    yield 'b';
    return 'c';
}

for(const entry of abc()){
    console.log(entry); // a, b만 출력
}
```
- 실제 실행 값 (done이 true면 그때의 value는 출력되지 않고 종료)
    1. {value : a, done: false}
    1. {value : b, done: false}
    1. {value : c, done: true}
    
- 추가 예제
```
function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20  
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myitr.next());   // {value:1, done:false}
console.log(myitr.next(10)); // {value:11, done:false}
console.log(myitr.next(20)); // {value:22, done:false}
console.log(myitr.next(30)); // {value:60, done:true}

=> next() 메소드가 리턴하는 값은 제네레이터가 실행을 정지할 때 yield 문이 반환하는 값(yield문의 오른쪽)이고
next() 메소드의 파라메터는 제네레이터가 실행을 재개할 때 yield 문이 반환하는 값(yield 문의 왼쪽)이 된다.

```
   
[심볼, 이터레이터, 제너레이터에 대한 설명](https://gist.github.com/qodot/ecf8d90ce291196817f8cf6117036997)

###chapter 13 - 함수와 추상적 사고

> 서브 루틴으로서의 함수

    - 반복되는 작업에 이름을 붙여 호출하는 형태 

> 순수 함수

    - 입력이 같으면 결과도 같은 함수

> 함수로서의 함수

```
const colors = ['red','orange','yellow','green','blue','indigo','violet'];
let colorIndex = -1;
function getNextRainbowColor() {
    if(++colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
}

--> colorIndex 변수가 getNextRainbowColor 함수에 속하지 않는데도 상태 값이 변하는 부수효과가 발생

-------------------------------------------------------------------------------

const getNextRainbowColor = (function(){
    const colors = ['red','orange','yellow','green','blue','indigo','violet'];
    let colorIndex = -1;
    return function(){
        if(++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    }
})();

--> 즉시실행 함수, 클로저로 colorIndex 변수 보호

setInterval(function(){
    document.querySelector('.rainbow').style['background-color'] = getNextRainbowColor();
}, 500);

--> 5초마다 색상이 변하게 수정

-------------------------------------------------------------------------------

function getRainbowIterator() {
    const colors = ['red','orange','yellow','green','blue','indigo','violet'];
    let colorIndex = -1;
    return {
        next() {
            if(++colorIndex >= colors.length) colorIndex = 0;
            return {value: colors[colorIndex], done: false };
        }
    };
}
const rainbowIterator = getRainbowIterator();
setInterval(function(){
    document.querySelector('.rainbow').style['background-color'] = getRainbowIterator.next().value;
}, 500);

--> 이터레이터로 수정

```

> IIFE와 비동기적 코드

```

setTimeout(function(){
    console.log('hello');
}, 1500);

-------------------------------------------------------------------------------

var i;
for(i = 5; i>=0; i--) {
    setTimeout(function(){
        console.log(i===0? "go!":i);
    }, (5-i)*1000);
}
-------------------------------------------------------------------------------

for(var i = 5; i>=0; i--) {
    setTimeout(function(){
        console.log(i===0? "go!":i);
    }, (5-i)*1000);
}

-------------------------------------------------------------------------------

for(let i = 5; i>=0; i--) {
    setTimeout(function(){
        console.log(i===0? "go!":i);
    }, (5-i)*1000);
}

--> 블록스코프 변수 사용

var i;
for(i=5; i>=0; i--){
    (function(i){
        setTimeout(functino(){
            console.log(i===0?"go":i);
        }, (5-i)*1000);
    })(i);
}

--> 즉시 실행 함수

```

> 변수로서의 함수

``` 
    const Money = require('math-money');
    const oneDollar = Money.Dollar(1);
    
    // Money.Dollar도 길게 느껴진다면
    const Dollar = Money.Dollar;
    const twoDollars = Dollar(2);
    // oneDollar와 twoDollars는 같은 타입의 인스턴스
```

> 재귀

```
function findNeedle(haystack) {
    if(haystack.length === 0) return "no haystack here!";
    if(haystack.shift() === 'needle') return "found it";
    return findNeedle(haystack); // 건초더미에 들어있는 건초가 하나 줄었습니다.
}

findNeedle(['hay','hay','hay','hay','hay','hay','needle','hay','hay']);
```

###chapter 14 - 비동기적 프로그래밍                             

> 비동기를 사용하는 이유

1. Ajax 호출을 비롯한 네트워크 요청
1. 파일을 읽고 쓴느 등의 파일시스템 작업
1. 의도적으로 시간 지연을 사용하는 기능(알람 등)

> 오류 우선 콜백

```
const fs = require('fs');
const filename = 'test.txt';
fs.readFile(filename, function(err, data){
    if(err) return console.error("error!!!");
    console.log(`${fname} contents: ${data}`);
});
```

> try... catch
```
const fs = require('fs');
function readSketchyFile() {
    try
    {	
        fs.readFile('does_not_exist.txt', function(err, data) {
            if(err) throw err;
        });
    }
    catch (err)
    {
        console.log('warning: minor issue occurred, program continuing');
    }
}
readSketchyFile();
```
--> 같은 함수 안에서만 try catch 할수 있는데 예외는 readFile 안에 익명함수에서 일어남

> 프라미스

--> 비동기 함수 실행시 성공 또는 실패를 객체로 전달함

```

>> 프라미스 만들기

function countdown(seconds){
	return new Promise(function(resolve, reject){
		for(let i=seconds; i>=0; i--){
			setTimeout(function(){
				if(i>0) console.log(i + '...');
				else resolve(console.log("GO!"));
			},(seconds-i)*1000);
		}

	});
  }
  
>> 프라미스 실행

countdown(5);

>> 프라미스 사용

countdown(5).then(
    function(){
        console.log('success');    
    }, function(err){
        console.log('fail' + err.message);    
    }     
);

>> 변수로 받아서 사용

const p = countdown(5);
p.then(functino(){
    console.log('success');
});

p.then(functino(err){
    console.log('fail' + err.message);
})

>> 에러가 나도 계속 실행

function countdown(seconds){
	return new Promise(function(resolve, reject){
		for(let i = seconds; i>=0; i--){
			setTimeout(function(){
				if(i===13) return reject(new Error());
				if(i>0) console.log(i+ '...');
				else resolve(console.log("GO!"));
			},(seconds-i)*1000);
		}
	});
}

```

> 이벤트

멍게소리지..

> 프라미스 체인

```
function launch(){
	return new Promise(function(resolve, reject){
		console.log("Lift off");
		setTimeout(function(){
			resolve("In orbit!");
		}, 2*1000);	// 2초만에 궤도에 도달하다니!
	}
}

const c = new Countdown(5)
    .on('tich', i => console.log(i + '...'));
    
c.go()
    .then(launcher)
    .then(function(msg){
        console.log(msg);
    })
    .catch(function(err){
        console.error("error");
    });
    
>> 체인 사용시 어디서 에러가 나던 catch를 수행함

```
[자세한 설명](https://jeong-pro.tistory.com/128)

> 제너레이터

아몰랑..
