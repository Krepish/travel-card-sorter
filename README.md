# Сортировщик карточек путешественника

Вам дана стопка посадочных карточек на различные виды транспорта, которые доставят вас из точки A в точку B. Карточки перепутаны, и вы не знаете, где начинается и где заканчивается ваше путешествие. Каждая карточка содержит информацию о том, откуда и куда вы едете на данном отрезке маршрута, а также о типе транспорта (номер рейса, номер места и прочее).

Предоставьте JavaScript API, который отсортирует такой список карточек и вернет словесное описание, как проделать ваше путешествие. API должен принимать на вход несортированный список карточек в формате, придуманном вами, и возвращать, например, такое описание:

- Take train 78A from Madrid to Barcelona. Seat 45B.
- Take the airport bus from Barcelona to Gerona Airport. No seat assignment.
- From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.
- From Stockholm, take flight SK22 to New York JFK. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg.
## Требования:

- Алгоритм должен работать с любым количеством карточек, если все карточки образуют одну неразрывную цепочку.
- Время прибытия и отправления неизвестно и неважно. Подразумевается, что средство передвижения для следующего отрезка дожидается вас.
- труктура кода должна быть расширяема для использования любых типов транспорта и информации, которая может быть связана с каждым типом транспорта.
- API будет вызываться из других частей JavaScript-кода без необходимости дополнительных запросов между браузером и сервером.
- Не используйте библиотеки и фреймворки, напишите все с нуля.
- Задокументируйте в коде формат входных и выходных данных.

## Для использования API
Подключаем фаил ``` src="travelCardSorter.js" ```
```
<script src="travelCardSorter.js" type="text/javascript"></script>
```
**cards** - исходный массив из посадочных карточек <br>
**sortCards(cards)** - метод для сортировки карточек <br>
**travelDescription()** - возвращает описание полного маршрута в виде массива<br>

## Пример использования:
```
let sortedCards = new Cards(); //класс реализующий API
sortedCards.sortCards(cards);
let description = sortedCards.travelDescription();
	
if(description){
  console.log(description);

  let routElem = document.getElementById("rout");

	for(let i=0; i<description.length; i++){
		let rout = document.createElement('p');
                rout.innerHTML = description[i];
		routElem.appendChild(rout);
	}
}     
```
