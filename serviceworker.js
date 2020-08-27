const cacheName = 'core';
const offlinePage = 'offline.html';

addEventListener('install', function (event) {
	event.waitUntil(caches.open(cacheName).then(function (cache) {
		cache.add(new Request('index.html'));
		cache.add(new Request('en.html'));
		cache.add(new Request('fr.html'));
		cache.add(new Request('nl.html'));
		cache.add(new Request('offline.html'));
		cache.add(new Request('about.html'));
		cache.add(new Request('assets/css/style.css'));
		cache.add(new Request('assets/images/logo.png'));
		cache.add(new Request('assets/images/logo_en.png'));
		cache.add(new Request('assets/images/logo_fr.png'));
		cache.add(new Request('assets/images/logo_nl.png'));
		cache.add(new Request('assets/images/elijah-o-donnell-729230-unsplash.jpg'));
		cache.add(new Request('assets/images/george-coletrain-1134159-unsplash.jpg'));
		cache.add(new Request('assets/images/heidi-sandstrom-259886-unsplash.jpg'));
		cache.add(new Request('assets/images/rawpixel-740333-unsplash.jpg'));
		console.log('[Service Worker]: Installed');
		return;
	}));
});

addEventListener('activate', event => {
	console.log('[Service Worker]: Active');
});

addEventListener('fetch', function (event) {

	var request = event.request;
    
    // https://stackoverflow.com/a/49719964
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }

//     // Offline-first approach
//     event.respondWith(
//         caches.match(request).then(function (response) {
//             return response || fetch(request).then(function (response) {

//                 // Stash a copy in the cache
//                 var copy = response.clone();
//                 event.waitUntil(caches.open(cacheName).then(function (cache) {
//                     return cache.put(request, copy);
//                 }));

//                 // Return the requested file
//                 return response;

//             }).catch(function (error) {
//                 return caches.match(request).then(function (response) {
//                     return response || caches.match(offlinePage);
//                 });
//             });
//         })
//     );

    // Online-first approach
    event.respondWith(
		fetch(request).then(function (response) {

			// // Save the response to cache
			// if (response.type !== 'opaque') {
			// 	var copy = response.clone();
			// 	event.waitUntil(caches.open(cacheName).then(function (cache) {
			// 		return cache.put(request, copy);
			// 	}));
			// }

			// Then return it
			return response;

		}).catch(function (error) {
			return caches.match(request).then(function (response) {
				return response || caches.match(offlinePage);
			});
		})
	);

});
