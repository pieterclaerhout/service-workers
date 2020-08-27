addEventListener('install', function (event) {
	event.waitUntil(caches.open('core').then(function (cache) {
		cache.add(new Request('index.html'));
		cache.add(new Request('en.html'));
		cache.add(new Request('fr.html'));
		cache.add(new Request('nl.html'));
		cache.add(new Request('offline.html'));
		cache.add(new Request('assets/css/style.css'));
		cache.add(new Request('assets/images/logo.png'));
		cache.add(new Request('assets/images/logo_en.png'));
		cache.add(new Request('assets/images/logo_fr.png'));
		cache.add(new Request('assets/images/logo_nl.png'));
		return;
	}));
});

addEventListener('fetch', function (event) {

	var request = event.request;
    
    // https://stackoverflow.com/a/49719964
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }

    event.respondWith(
        caches.match(request).then(function (response) {
            return response || fetch(request).then(function (response) {

                // Stash a copy in the cache
                var copy = response.clone();
                event.waitUntil(caches.open('core').then(function (cache) {
                    return cache.put(request, copy);
                }));

                // Return the requested file
                return response;

            });
        })
    );

});
