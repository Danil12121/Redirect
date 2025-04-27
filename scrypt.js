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
            if (/android/i.test(userAgent)) {
                os = "Android";
            } else if (/iPad|iPhone|iPod/.test(userAgent)) {
                os = "iOS";
            } else {
                os = "Desktop";
            }    
            const paymentData = {
                amount: amount,
                currency: 'RUB',
                os: os
            };

            // Шифруем данные
            const encryptedData = simpleEncrypt(JSON.stringify(paymentData));
            if (/android/i.test(userAgent)) {
                os = "Android";
                var timeout = 300;
                var start = Date.now();
                let appOpened = false;
                // Пробуем открыть приложение с зашифрованными данными
                window.location = `mybankv2://open?data=${encodeURIComponent(encryptedData)}`;
                window.addEventListener('blur', () => {
                    appOpened = true;
                });
                setTimeout(function() {
                    var end = Date.now();
                    document.getElementById('myButton').textContent = `${end - start} ₽6`;
                     if (!appOpened) {  
                        // Если приложение не открылось, переходим на сайт
                       window.location = `https://serebrovskaya.github.io/ifAppNotFound/?data=${encodeURIComponent(encryptedData)}`;
                    }

                }, timeout);
                
            } else if (/iPad|iPhone|iPod/.test(userAgent)) {
                os = "iOS";
                alert(`На iOS открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
            } else {
                os = "Desktop";
                let appLaunched = false;
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = `paymentapp://?data=${encodeURIComponent(encryptedData)}`;
                document.body.appendChild(iframe);

            // Проверка через polling
                const checkInterval = setInterval(() => {
                    if (!document.body.contains(iframe)) {
                        clearInterval(checkInterval);
                        appLaunched = true;
                        iframe.remove();
                    }
                  }, 100);        
                    
                setTimeout(() => {
                        document.getElementById('myButton').textContent = `₽18`;
                    if (!appLaunched) {
                        clearInterval(checkInterval);
                        iframe.remove();
                        window.location = `https://serebrovskaya.github.io/ifAppNotFound/?data=${encodeURIComponent(encryptedData)}`;
                    }
                }, 2500);
        

            }
            
            // Меняем текст кнопки
            this.style.backgroundColor = '#28a745';
           //document.getElementById('myButton').textContent = os;
        });  
