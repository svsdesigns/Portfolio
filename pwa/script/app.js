if ('serviceWorker' in navigator) {
  navigator.serviceWorker
		.register('/worker.js')
		.then(function() { console.log('Service Worker Registered'); });
}