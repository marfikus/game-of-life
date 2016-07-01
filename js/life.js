
//поиск в массиве--------------------------------------------------------------------------
// создаем пустой массив и проверяем поддерживается ли indexOf
if ([].indexOf) {

  var find_in_array = function(array, value) {
	return array.indexOf(value);
  }
	
// если не поддерживается, то перебираем массив вручную
} else {
  var find_in_array = function(array, value) {
	for (var i = 0; i < array.length; i++) {
	  if (array[i] === value) return i;
	}

	return -1;
  }

}
//-----------------------------------------------------------------------------------------

//развитие жизни---------------------------------------------------------------------------
function evolution() {
	
	var sibl_count = 0;	// количество соседей клетки 
	var must_die = [];	// массив клеток, которые погибнут
	var must_birth = [];	// массив клеток, которые родятся
	var pole=document.getElementById("pole");	// поле, собственно место действия 
	var rows_length = pole.rows.length;	// число строк поля 
	var cells_length = pole.rows[0].cells.length;	// число столбцов поля

	// этап 1: "сканирование"
	// пробегаем в циклах по всем клеткам 
	for (var i=0; i < rows_length; i++) {
		for (var j=0; j < cells_length; j++) {
			
			sibl_count = 0;
			
			// проверяем, есть ли у клетки соседи (по кругу), и считаем их
			if ((i-1 !== -1) && (j-1 !== -1)) {
				if (pole.rows[i-1].cells[j-1].classList.contains('set')) { sibl_count++; }
			}
			if (i-1 !== -1) {
				if (pole.rows[i-1].cells[j].classList.contains('set')) { sibl_count++; }
			}
			if ((i-1 !== -1) && (j+1 !== cells_length)) {
				if (pole.rows[i-1].cells[j+1].classList.contains('set')) { sibl_count++; }
			}
			if (j-1 !== -1) {
				if (pole.rows[i].cells[j-1].classList.contains('set')) { sibl_count++; }
			}
			if (j+1 !== cells_length) {
				if (pole.rows[i].cells[j+1].classList.contains('set')) { sibl_count++; }
			}
			if ((i+1 !== rows_length) && (j-1 !== -1)) {
				if (pole.rows[i+1].cells[j-1].classList.contains('set')) { sibl_count++; }
			}
			if (i+1 !== rows_length) {
				if (pole.rows[i+1].cells[j].classList.contains('set')) { sibl_count++; }
			}
			if ((i+1 !== rows_length) && (j+1 !== cells_length)) {
				if (pole.rows[i+1].cells[j+1].classList.contains('set')) { sibl_count++; }
			}
			
			// если клетка живая и у нее меньше 2 или больше 3 соседей, то по правилам она должна погибнуть (от одиночества или перенаселения соответственно)
			if (pole.rows[i].cells[j].classList.contains('set')) {
				if ((sibl_count < 2) || (sibl_count > 3)) {
					// добавляем ее в массив клеток, которые должны погибнуть
					must_die.push(""+i+""+j);
				}
			// иначе, если клетка мертва(пустая) и у нее 3 соседа, то в ней должна зародиться жизнь
			} else {
				if (sibl_count == 3) {
					// добавляем ее в массив клеток, которые должны родиться
					must_birth.push(""+i+""+j);
				}							
			}

		}
	} 
	
	// этап 2: "гибель\рождение"
	// снова пробегаем в циклах по всем клеткам 
	for (var i=0; i < rows_length; i++) {
		for (var j=0; j < cells_length; j++) {
			
			// если клетка живая и она есть в массиве тех, которые должны погибнуть, то ... ей придется погибнуть... это всего лишь игра, ничего личного...=)
			if (pole.rows[i].cells[j].classList.contains('set')) {
				if (find_in_array(must_die, ""+i+""+j) !== -1) {
					pole.rows[i].cells[j].classList.remove('set');  // просто убираем у нее класс 'set', остальное сделает css
				}
			// иначе, если клетка мертва(пустая), и она есть в массиве тех, которые должны родиться, то рождаем ее 
			} else {
				if (find_in_array(must_birth, ""+i+""+j) !== -1) {
					pole.rows[i].cells[j].classList.add('set'); // добавляем ей класс 'set'
				}							
			}						
			
		}
	}	
	
	if ($("#button_start").val() == "СТОП!") {				
		timeout_id = setTimeout(evolution, 2000);	// снова запускаем таймер на 2сек (2000 мсек) (рекурсия)
	}
}
//-----------------------------------------------------------------------------------------

//начать развиваться-----------------------------------------------------------------------
function start_evol() {
	
	var $button_start = $("#button_start");

	if ($button_start.val() == "Начать развиваться") {	// запустили развитие
		
		$button_start.val("СТОП!");	
		$("#button_step_next").prop("disabled", true);
		$('td').off('click');	// убираем обработчик клика, дабы не мешать развитию жизни
		timeout_id = setTimeout(evolution, 2000);	// запускаем таймер на 2сек (2000 мсек), который запускает функцию evolution()
		return;
		
	} else {	// остановили разитие
		
		clearTimeout(timeout_id);	// останавливаем таймер
		$button_start.val("Начать развиваться");
		$("#button_step_next").prop("disabled", false);
		$('td').on('click', function() {	// снова вешаем обработчик клика т.к развитие остановлено
			$(this).toggleClass("set")
		});					
		
	}

}
//-----------------------------------------------------------------------------------------

//шаг вперёд-------------------------------------------------------------------------------
function step_next() {
	evolution();
}
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
$(document).ready(function() {
	
	// вешаем обработчик клика по ячейке таблицы
	$('td').on('click', function() {
		$(this).toggleClass("set")
	});				
	
});
//-----------------------------------------------------------------------------------------
