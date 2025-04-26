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
                currency: 'RUB',
                timestamp: new Date().toISOString(),
                os: null
            };
            
            if (/android/i.test(userAgent)) {
                os = "Android";
                paymentData.os = "Android";
                
                // Шифруем данные
                const encryptedData = simpleEncrypt(JSON.stringify(paymentData));
                
                var timeout = 1000;
                var start = Date.now();
                
                // Пробуем открыть приложение с зашифрованными данными
                window.location = `bank://payment?data=${encodeURIComponent(encryptedData)}`;
                
                setTimeout(function() {
                    var end = Date.now();
                    if (end - start < timeout + 500) {
                        // Если приложение не открылось, переходим на сайт
                        window.location = `https://www.tbank.ru/cards/debit-cards/tinkoff-pay/form/?data=${encodeURIComponent(encryptedData)}`;
                    }
                }, timeout);
                
            } else if (/iPad|iPhone|iPod/.test(userAgent)) {
                os = "iOS";
                paymentData.os = "iOS";
                alert(`На iOS открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
            } else {
                os = "Desktop";
                paymentData.os = "Desktop";
                alert(`На десктопе открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
            }
            
            // Меняем текст кнопки
            this.textContent = `5 Версия (${os})`;
            this.style.backgroundColor = '#28a745';
        });
