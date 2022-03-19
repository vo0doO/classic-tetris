## Использование React, Redux, Immutable to code Tetris.

----
Тетрис – это классическая игра, которая всегда с энтузиазмом реализовывалась на различных языках. В Javascript есть много его версий, и использование React для выполнения тетриса стало моей целью.

Открытый [https://vo0doo.github.io/classic-tetris](https://vo0doo.github.io/classic-tetris) играть!

----
### Предварительный просмотр интерфейса
![Обзор интерфейса](https://img.alicdn.com/tps/TB1Ag7CNXXXXXaoXXXXXXXXXXXX-320-483.gif)

Это нормальная скорость записи, вы можете видеть, что она имеет плавный опыт.

### Отзывчивый
![Отзывчивый! [Отзывчивый] (https://img.alicdn.com/tps/TB1AdjZNXXXXXcCapXXXXXXXXXX-480-343.gif)](https://img.alicdn.com/tps/TB1AdjZNXXXXXcCapXXXXXXXXXX-480-343.gif)

Относится не только к экранизации, `но изменение ввода в зависимости от вашей платформы, использование клавиатуры в ПК и в телефоне с использованием сенсорного ввода в качестве ввода`:

![Телефон](https://img.alicdn.com/tps/TB1kvJyOVXXXXbhaFXXXXXXXXXX-320-555.gif)

### Сохранение данных
![Сохранение данных](https://img.alicdn.com/tps/TB1EY7cNXXXXXXraXXXXXXXXXXX-320-399.gif)

Что самое худшее может случиться, когда вы играете в автономные игры? Отключение электроэнергии. Состояние хранится в `localStorage` подписавшись на `store.subscribe`, который фиксирует ровно все состояние. Веб-страница обновляется, программа вылетает, телефон мертв, просто снова откройте соединение, и вы можете продолжить игру.

### Предварительный просмотр состояния Redux ([Расширение Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension))
![Предварительный просмотр состояния Redux](https://img.alicdn.com/tps/TB1hGQqNXXXXXX3XFXXXXXXXXXX-640-381.gif)

Redux управляет всем состоянием, которое должно храниться, что является гарантией сохранения, как упоминалось выше.

----
Игровой фреймворк – это использование [React](https://facebook.github.io/react/) + [Redux](http://redux.js.org/), вместе с [Immutable.js](https://facebook.github.io/immutable-js/).

## 1. Что такое Immutable.js?
Неизменяемые — это данные, которые не могут быть изменены после их создания. Любое изменение, добавление или удаление неизменяемого объекта возвращает новый неизменяемый объект.

### Знакомый：
Давайте посмотрим на следующий код:
``` JavaScript
function keyLog(touchFn) {
  let data = { key: 'value' };
  f(data);
  console.log(data.key); // Guess what will be printed?
}
```
If we do not look at `f`, and do not know what it did to `data`, we can not confirm what will be printed. But if `data` is *Immutable*, you can be sure that `data` haven't changed and `value` is printed:
``` JavaScript
function keyLog(touchFn) {
  let data = Immutable.Map({ key: 'value' });
  f(data);
  console.log(data.get('key'));  // value
}
```

JavaScript uses a reference assignment, meaning that the new object simply refers to the original object, changing the new will also affect the old:
``` JavaScript
foo = {a: 1};  bar = foo;  bar.a = 2;
foo.a // 2
```
Although this can save memory, when the application is complex, it can result in the state not being controllable, posing a big risk. The advantages of saving memory, in this case, become more harm than good.

With Immutable.js the same doesn't happen:
``` JavaScript
foo = Immutable.Map({ a: 1 });  bar = foo.set('a', 2);
foo.get('a') // 1
```

### Concise：
In `Redux`, it's a good practice to return a new object (array) to each `reducer`, so we often see code like this:
``` JavaScript
// reducer
...
return [
   ...oldArr.slice(0, 3),
   newValue,
   ...oldArr.slice(4)
];
```
In order modify one item in the array and return the new object (array), the code has this strange appearance above, and it becomes worse the deeper the data structure.
Let's take a look at Immutable.js's approach:
``` JavaScript
// reducer
...
return oldArr.set(4, newValue);
```
Isn't it simpler?

### About “===”：
We know that ```===``` operator for the `Object` and `Array` compares the reference to the address of the object rather than its "value comparison", such as:
``` JavaScript
{a:1, b:2, c:3} === {a:1, b:2, c:3}; // false
[1, 2, [3, 4]] === [1, 2, [3, 4]]; // false
```

To achieve the above we could only `deepCopy` and `deepCompare` to traverse the objects, but this is not only cumbersome it also harms performance.

Let's check `Immutable.js` approach!
``` JavaScript
map1 = Immutable.Map({a:1, b:2, c:3});
map2 = Immutable.Map({a:1, b:2, c:3});
Immutable.is(map1, map2); // true

// List1 = Immutable.List([1, 2, Immutable.List[3, 4]]);
List1 = Immutable.fromJS([1, 2, [3, 4]]);
List2 = Immutable.fromJS([1, 2, [3, 4]]);
Immutable.is(List1, List2); // true
```
It's smooth like a breeze blowing.

React has a big trick when it comes to performance tuning. It uses `shouldComponentUpdate()` to check (as the name says) if the component should be re-rendered, it returns `true` by default, which always executes the `render()` method followed by the Virtual DOM comparison.

If we don't return a new object when making state updates, we would have to use `deepCopy` and `deepCompare` to calculate if the new state is equal to the previous one, the consumption of the performance is not worth it. With Immutable.js, it's easy to compare deep structures using the method above.

For Tetris, imagine that the board is a `two-dimensional array`. The square that can be moved is `shape (also a two-dimensional array) + coordinates`. The superposition of the board and the box is composed of the final result of `Matrix`. The properties above are built by `Immutable.js`, through its comparison method, you can easily write `shouldComponentUpdate`. Source Code:[/src/components/matrix/index.js#L35](https://github.com/chvin/react-tetris/blob/master/src/components/matrix/index.js#L35)

Неизменные учебные материалы:
* [Immutable.js](http://facebook.github.io/immutable-js/)
* [Immutable Detailed and React in practice](https://github.com/camsong/blog/issues/3)


----
## 2. Как использовать Immutable.js в Redux
Цель: `state` -> Неизменный.
Важные плагины: [gajus/redux-immutable](https://github.com/gajus/redux-immutable)
Будет предоставлен оригинальными коммуникаторами Redux, предоставленные вышеупомянутыми плагинами:
``` JavaScript
// rootReducers.js
// import { combineReducers } from 'redux'; // The old method
import { combineReducers } from 'redux-immutable'; // The new method

import prop1 from './prop1';
import prop2 from './prop2';
import prop3 from './prop3';

const rootReducer = combineReducers({
  prop1, prop2, prop3,
});


// store.js
// Create a store method and the same general
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
export default store;
```
Через новое `combineReducers` Объект магазина будет храниться как объект Immutable.js, контейнер будет немного отличным, но это то, что мы хотим:
``` JavaScript
const mapStateToProps = (state) => ({
  prop1: state.get('prop1'),
  prop2: state.get('prop2'),
  prop3: state.get('prop3'),
  next: state.get('next'),
});
export default connect(mapStateToProps)(App);
```


----
## 3. Веб-аудио пожар
В игре много разных звуковых эффектов, но на самом деле мы поддерживаем только ссылку на звуковой файлe: [/build/music.mp3](https://github.com/chvin/react-tetris/blob/master/build/music.mp3). С помощью `Web Audio Api`, Вы можете воспроизводить аудио в миллисекундной точности, с высокой частотой, что невозможно с тегом `<audio>`. Нажмите клавиши со стрелками, чтобы переместить коробку, когда игра выполняется, вы можете услышать высокочастотный звук.

![Web audio advanced](https://img.alicdn.com/tps/TB1fYgzNXXXXXXnXpXXXXXXXXXX-633-358.png)

`WAA` является новым набором относительно независимой интерфейсной системы, аудиофайл имеет более высокую мощность обработки и более профессиональные встроенные аудиоэффекты, является рекомендованным интерфейсом W3C, может иметь дело с профессиональной «скоростью звука, объемом, окружающей средой, звуковой визуализации, высоким Частота, звук на "и другие потребности. На следующем рисунке описывается использование процесса WAA.

![Process](https://img.alicdn.com/tps/TB1nBf1NXXXXXagapXXXXXXXXXX-520-371.png)

Где `Source` представляет собой аудиоисточник, `Destination` представляет собой окончательный выход. Несколько источников составляют место назначения.
Исходный код:[/src/unit/music.js](https://github.com/chvin/react-tetris/blob/master/src/unit/music.js). Для достижения ajax загрузка mp3 и waa, контролировать процесс воспроизведения.

`WAA` поддерживается в последних 2 версиях каждого браузера([CanIUse](http://caniuse.com/#search=webaudio))

![browser compatibility](https://img.alicdn.com/tps/TB15z4VOVXXXXahaXXXXXXXXXXX-679-133.png)

То есть и андроид не хватает поддержки, хотя.

Веб-аудио API Учебные материалы:
* [Веб-аудио концепции и использование| MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [Начало работы с веб-аудио API](http://www.html5rocks.com/en/tutorials/webaudio/intro/)


----
## 4. Игра на опыте оптимизации
* Опыт:
	* Нажмите клавиши со стрелками, чтобы двигаться вертикально и горизонтально. Частота триггера отличается, игра может определить частоту триггера вместо исходной частоты событий, исходный код:[/src/unit/event.js](https://github.com/vo0doO/classic-tetris/blob/master/src/unit/event.js) ;
	*Влево и вправо, чтобы переместить задержку, может отбросить скорость, но при перемещении в стенке меньшая задержка; По скорости 6 через задержку обеспечит полное горизонтальное движение подряд;
	* То `touchstart` and `mousedown` События также зарегистрированы для кнопки для отзывчивых игр. Когда `touchstart` occurs, `mousedown` не срабатывает, а когда `mousedown` происходит, то `mouseup` симулятор `mouseup` также будет слушать как `mouseup`, Поскольку элемент события удаления мыши не может огонь. Исходный код:[/src/components/keyboard/index.js](https://github.com/vo0doO/classic-tetris/blob/master/src/components/keyboard/index.js);
	* То `visibilitychange` событие, когда страница скрыта \ коммутатор, игра не будет продолжаться, переключиться назад, и она будет продолжаться, `focus` Состояние также было написано в Redux. Так, когда играете с телефоном, и телефон имеет `call`, прогресс игры будет сохранен; ПК Открыть игру Не слышать другого Gameover, что немного похоже `ios` Переключатель приложений;
	* В игре `any` Время обновления страницы (например, закрытие вкладки или конец игры) может восстановить текущее состояние;
	* Единственные картинки, используемые в игре, ![image](https://img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png), Все остальное это CSS;
	* Игра Совместим с Chrome, Firefox, IE9 +, ETG ETC .;
* Правила：
	* Вы можете указать начальную доску (десять уровней) и скорость (шесть уровней) до начала игры;
	* 100 баллов за 1 строку, 300 баллов за 2 строки, 700 баллов за 3 строки, 1500 баллов за 4 строки;
	* Скорость падения коробки увеличивается с количеством ликвидации рядов (один уровень на каждые 20 строк);


----
## 5. Experience in Development
* `shouldComponentUpdate` is written for all react components, which on the phone causes a significant performance improvement. For Large and medium-sized applications when facing performance problems, try writing your own  `shouldComponentUpdate`, it will most probably help you.
* `Stateless Functional Components`([Stateless Functional Components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d#.xjqnbfx4e)) has no lifecycle hooks. And because all components need to write the life cycle hook `shouldComponentUpdate`, they are not used.
* In the `webpack.config.js` `devServer` attribute is written `host: '0.0.0.0'`, but you can be use in the development any other ip, not limited to localhost;
* Redux in the `store` not only connect to the method passed to `container`, you can jump out of the component, in other documents out to do flow control (dispatch), the source code:[/src/control/states.js](https://github.com/chvin/react-tetris/blob/master/src/control/states.js)；
* Dealing with persistence in React + Redux is very convenient, as long as the redux state of storage, reducers do read in each of the initialization time.
* By configuring `.eslintrc.js` and `webpack.config.js`, the `ESLint` test is integrated in the project. Using ESLint allows coding to be written to specifications, effectively controlling code quality. Code that does not conform to the specifications can be found through the IDE and the console at development time (or build time). reference:[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)；


----
## 6. Summary
* As a React hand application, in the realization of the process found a small "box" or a lot of details can be optimized and polished, this time is a test of a front-end engineers and the skill of the time carefully.
* Optimization of the direction of both React itself, such as what state is stored by the Redux, which states to the state of the component like; and out of the framework of the product can have a lot of features to play, in order to meet your needs, these will be natural propulsion technology development of.
* An application from scratch, the function slowly accumulate bit by bit, it will build into a high-rise, do not fear it difficult to have the idea to knock on it. ^_^


----
## 7. Flowchart
![Flowchart](https://img.alicdn.com/tfs/TB1B6ODRXXXXXXHaFXXXXXXXXXX-1920-1080.png)

----
## 8. Development
### Install
```
npm install
```
### Run
```
npm start
```
The browser will go to [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
### multi-language
In the [i18n.json](https://github.com/chvin/react-tetris/blob/master/i18n.json) is the configuration for the multi-language environment. You can change the language by passing the url parameter `lan` like this: `https://chvin.github.io/react-tetris/?lan=en`
### Build
```
npm run build
```

Will build the application in the build folder.



