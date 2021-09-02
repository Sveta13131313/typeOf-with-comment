//функция сравнения типа данных с типом каждого значения введеного пользователем
//обращение к массиву и через метод фильтр если тип данных совпадает с значение, оставляем это значение в массиве
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

//функция скрытия полей вывода результата при запуске сайта
	hideAllResponseBlocks = () => {
		//получаем два поля для вывода результата в коллекцию
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//проходимся по этим полям и каждому задаём свойство не показывать этот элемент
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//фукция показа результата в поле вывода, получает входные данные в какое поле выводить,сообщение которое выводить и в какой элемент выводить это значение
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//вызываем функцию скрытия полей вывода
		hideAllResponseBlocks();
		//обращаемся к элементу и показываем  тот блок, который передан в функцию 
		document.querySelector(blockSelector).style.display = 'block';
		//если у элемента есть селектор, то передаем текствое сообщение в этот элемент
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//показать ошибку, если пользователь неккоретно ввёл данные
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//показать результат в поле вывода результа, если пользователь ввел значения равные типу данных
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//показать результат в поле вывода результа, если пользователь ввел значения  и они не равные типу данных
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),


	//Функция фильтрации веденных значений, подходят ли они под выбранный тип данных
	tryFilterByType = (type, values) => {
		//выполнять код, если будет ошибка перейти  к catch
		try {
			//объявляем массив в него задаём строку кода, в которой вызываем функцию фильтр по типу и передаем туда значения тип данных и сами данные (данные передаются по одному значению разделенные запятой)
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//если в переменной valuesArray есть что-то (хотя бы одно введеное значение совпало по типу)
			const alertMsg = (valuesArray.length) ?
			//присваиваем сообщение, что мы получили в alertMsg
				`Данные с типом ${type}: ${valuesArray}` :
				//иначе говорим, что подходящих данных не нашлось
				`Отсутствуют данные типа ${type}`;
				//вызываем функцию показа результата и передаем туда сообщение, которое сгенерировалось в переменной  alertMsg
			showResults(alertMsg);
			//если произошла ошибка выполнения при работе программы
		} catch (e) {
			//вызываем функцию показа ошибки и передаем туда сообщение об ошибке
			showError(`Ошибка: ${e}`);
		}
	};

//получили по селектору кнопку - "фильтровать"
const filterButton = document.querySelector('#filter-btn');

//Событие - нажата кнопка фильтровать
filterButton.addEventListener('click', e => {
	//получаем тип данных с страницы по id
	const typeInput = document.querySelector('#type');
	//получаем поле ввода данных с страницы по id
	const dataInput = document.querySelector('#data');

	//если поле ввода пустое
	if (dataInput.value === '') {
		//Присваиваем сообщение об ошибки
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//показываем ошибку в поле пользователю
		showNoResults();
		//иначе
	} else {
		//не показываем ошибку
		dataInput.setCustomValidity('');
		//останавливаем стандратное поведение браузера
		e.preventDefault();
		//вызываем функцию фильтрации данных и передаём туда тип данных и строку со значениями, предварительно удалив в ней лишние проблемы в начале и конце
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

