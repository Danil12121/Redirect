document.getElementById('myButton').addEventListener('click', function() {
    // Определяем ОС
    let os;
    const userAgent = navigator.userAgent;
    
    if (/android/i.test(userAgent)) {
        os = "Android";
        var timeout = 1000; // сколько ждем после каждой попытки
        var start = Date.now();

      // Сначала пробуем открыть первое приложение
        window.location = "bank://path";

        setTimeout(function() {
        var end = Date.now();
        if (end - start < timeout + 500) { // значит первое приложение не открылось
          start = Date.now();
          window.location = "https://www.tbank.ru/cards/debit-cards/tinkoff-pay/form/";
        }
      }, timeout);
        
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        os = "iOS";
    } else {
        os = "Desktop";
    }
    
    // Меняем текст кнопки
    this.textContent = `Вы используете: ${os}`;
    
    // Можно также добавить дополнительный стиль
    this.style.backgroundColor = '#28a745';
});
