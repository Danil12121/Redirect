        // Генерируем случайную сумму от 100 до 10000 рублей
        function generateRandomAmount() {
            return Math.floor(Math.random() * 9900) + 100;
        }
        
        // Простая функция "шифрования" (в реальном проекте используйте более надежные методы)
        function simpleEncrypt(data) {
            return btoa(unescape(encodeURIComponent(data)));
        }
        
        // Показываем сумму на экране
        const amount = generateRandomAmount();
        document.getElementById('amountDisplay').textContent = `Сумма: ${amount} ₽`;

        // Обработчик кнопки
        document.getElementById('myButton').addEventListener('click', function() {
            // Определяем ОС
            let os;
            const userAgent = navigator.userAgent;
            const paymentData = {
                amount: amount,
                currency: 'RUB'
            };

            // Шифруем данные
            const encryptedData = simpleEncrypt(JSON.stringify(paymentData));
            if (/android/i.test(userAgent)) {
                os = "Android";
                
                var timeout = 3000;
                var start = Date.now();
                
                // Пробуем открыть приложение с зашифрованными данными
                window.location = `notmybank://open?data=${encodeURIComponent(encryptedData)}`;
                
                setTimeout(function() {
                    var end = Date.now();
                    document.getElementById('myButton').textContent = `${end - start} ₽`;
                     if (end - start < timeout + 3500) {  
                        // Если приложение не открылось, переходим на сайт
                       window.location = `https://serebrovskaya.github.io/ifAppNotFound/?data=${encodeURIComponent(encryptedData)}`;
                    }

                }, timeout);
                
            } else if (/iPad|iPhone|iPod/.test(userAgent)) {
                os = "iOS";
                alert(`На iOS открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
            } else {
                os = "Desktop";
                alert(`На десктопе открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
            }
            
            // Меняем текст кнопки
            this.style.backgroundColor = '#28a745';
           //document.getElementById('myButton').textContent = os;
        });
