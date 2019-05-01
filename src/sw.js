var CACHE_NAME = 'ahorros-cache-v001'

// var urlToCache = [
//     '/',
//     '/app.js',
//     '/index.html',
//     '/runtime.a5dd35324ddfd942bef1.js',
//     '/main.7fa4cb47902684a09dad.js',    
//     '/styles.280e991c5992f8630bc9.css',
//     '/polyfills.46532d96d3286697c138.js'
// ];

var urlToCache = [
    '/',
    '/index.html'
];

self.addEventListener('install',(e) =>{
    
    e.waitUntil(caches.open(CACHE_NAME).then(function(cache){
        console.log('opened cache');
        return cache.addAll(urlToCache);
    }));

});

self.addEventListener('fetch',function(event){
    
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response)
                return response;
            return fetch(event.request);
        }));
        
});