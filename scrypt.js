document.getElementById('myButton').addEventListener('click', function() {
    // Определяем ОС
    let os;
    const userAgent = navigator.userAgent;
    
    if (/android/i.test(userAgent)) {
        os = "Android";
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
