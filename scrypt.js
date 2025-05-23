
function generateRandomAmount() {
	return Math.floor(Math.random() * 9900) + 100;
}

function simpleEncrypt(data) {
	return btoa(unescape(encodeURIComponent(data)));
}

function redirectToFallback(encryptedData) {
	window.location = `https://serebrovskaya.github.io/ifAppNotFound/?data=${encodeURIComponent(encryptedData)}`;
}

const amount = generateRandomAmount();
document.getElementById('amountDisplay').textContent = `Сумма к оплате: ${amount} ₽`;

document.getElementById('myButton').addEventListener('click', function() {
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


	const encryptedData = simpleEncrypt(JSON.stringify(paymentData));
	if (/android/i.test(userAgent)) {
		//let appOpened = false;

		window.location = `mybankv2://open?data=${encodeURIComponent(encryptedData)}`;
		// window.addEventListener('blur', () => {  });

		if (!document.hidden) {
			window.location = `mybank://open?data=${encodeURIComponent(encryptedData)}`;
			// window.addEventListener('blur', () => {  }); //appOpened = true;
		}	
			
		if (!document.hidden) {
			setTimeout(() => {
				redirectToFallback(encryptedData);
			}, 5000);
		}
	} else if (/iPad|iPhone|iPod/.test(userAgent)) {
		alert(`На iOS открытие приложения не поддерживается. Данные платежа: ${JSON.stringify(paymentData)}`);
	} else {
		let appLaunched = false;
		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = `paymentapp://?data=${encodeURIComponent(encryptedData)}`;
		             document.body.appendChild(iframe);

		const checkInterval = setInterval(() => {
			if (!document.body.contains(iframe)) {
				clearInterval(checkInterval);
				appLaunched = true;
				iframe.remove();
			}
		}, 100);

		setTimeout(() => {
			if (!appLaunched) {
				clearInterval(checkInterval);
				iframe.remove();
				redirectToFallback(encryptedData);
			}
		}, 2500);


	}

	this.style.backgroundColor = '#28a745';
	document.getElementById('myButton').textContent = 'Подождите...';
});
