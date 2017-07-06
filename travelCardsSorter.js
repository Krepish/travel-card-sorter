/*
	Формат входных данных - массив объектов.

	Структура карточки(объекта):
	{ 
		"from": название пункта отправления,
		"to": название пункта прибытия,
		"transport_type": "тип транспорта",
		"info": { (дополнительная информация о транспорте)
			"route" : "122",
			"seat" : "No seat assignment",
      "notes": "дополнительная информация"
		}
	}
*/

class Cards{
	constructor(){
		this.cards = []; 				//входные данные
		this.orderedCards = []; //сортированные данные
		this.hashTable = {}; 		//вспомогательная хеш-таблица
		this.description = []; 	//словесное описание путешествия в правильном порядке
	}

	/*Загрузка карточек*/
	loadCards(){

		//Проверка данных
		if (cards instanceof Array) {
    for (let i=0; i<cards.length; i++){
      if (!cards[i].from || cards[i].from === '') {
        console.error(`Пропущен пункт отправления в карточке ${i+1}: ${JSON.stringify(cards[i])}`);
        return false;
      } else if (!cards[i].to || cards[i].to === '') {
        console.error(`Пропущен пункт прибытия в карточке ${i+1}: ${JSON.stringify(cards[i])}`);
        return false;
      }
    };

		this.cards = cards;
	  } else {
	  	console.error("неверный формат данных.");
	  	return false;
	  }

		this.buildHashTable();
		return true;
	}

	/*Заполняем хеш-таблицу.
	Формат: {'пункт отправления': 'номер карточки'}
	*/
	buildHashTable(){
		this.cards.forEach((card, index) => {
			this.hashTable[card.from] = index;
		});
	}

	/*Поиск первой карточки
	1) Заполняем массив destination пунктами прибытия
	2) Ищем среди данного массива отсутствущий пункт прибытия
	   и кладем найденную карточку в массив orderedCards
	*/
	findFirstDeparture(){

		let destinations = [];
		this.cards.forEach( card => {
			destinations.push(card.to);
		});

		for(let i = 0; i<this.cards.length; i++){
			let currentCard = this.cards[i];
			if(!destinations.includes(currentCard.from)){
				this.orderedCards.push(currentCard);
				break;
			}
		}
	}

	/*Сортировка*/
	sortCards(cards){
		//загрузились ли карточки?
		if(!this.loadCards()){
			return false;
		}

		this.findFirstDeparture();

		/*
		Следующую карточку находим с помощью хеш-таблицы
		*/
		for(let i=0; i < this.cards.length-1; i++){
			let currentCard = this.orderedCards[i];
			let nextIndex = this.hashTable[currentCard.to];
			this.orderedCards.push(this.cards[nextIndex]);

		}
	}	

	/*Словесное описание*/
	travelDescription(){
		/*Формирование информации в зависимости от типа транспорта*/
		if(this.orderedCards.length !== 0 ) {
			this.orderedCards.forEach(card => {
			let travelCardInfo = "";
			switch(card.transport_type){
	  	  case 'train':
	       	travelCardInfo = `Take train ${card.transport_info.route} from ${card.from} to ${card.to}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	  	  case 'airport bus':
	  	    travelCardInfo =`Take the airport bus from ${card.from} to ${card.to}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	  		case 'plane':
	  			travelCardInfo =`From ${card.from}, take flight ${card.transport_info.flight} to ${card.to}. Gate: ${card.transport_info.gate}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	      case 'taxi':
	  			travelCardInfo =`Take a taxi from ${card.from} to ${card.to}.${card.transport_info.notes}`;
	      break;
	  	}
			this.description.push(travelCardInfo);
		});
		} else {
			console.error("Список не отсортирован или пуст.");
			return;
		}
		return this.description;
	};
}