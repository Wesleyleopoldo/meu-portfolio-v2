// === POPUP ===
const popup = document.getElementById("overlay");

function closePopUp() {
    popup.style.display = "none";
}

function openPopUp() {
    popup.style.display = "flex";
}

// === MOBILE MENU ===
function toggleMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('nav-menu');
    btn.classList.toggle('active');
    nav.classList.toggle('open');
}

function closeMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('nav-menu');
    btn.classList.remove('active');
    nav.classList.remove('open');
}

// === MATRIX DIGITAL RAIN ===
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:<>?';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ================================
//  HACKING INTRO ANIMATION
// ================================
(function () {
    const overlay = document.getElementById('hack-overlay');
    const output = document.getElementById('hack-output');
    const accessDiv = document.getElementById('hack-access');

    if (!overlay || !output) return;

    // Save current scroll position and lock body
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('locked');

    // Prevent ALL touch events from propagating past the overlay
    function preventTouch(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    overlay.addEventListener('touchmove', preventTouch, { passive: false });
    overlay.addEventListener('touchstart', preventTouch, { passive: false });
    document.addEventListener('touchmove', preventTouch, { passive: false });

    const randomIP = () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const randomMAC = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
    const randomService = (port) => ({ 22: 'ssh', 80: 'http', 443: 'https', 8080: 'http-proxy', 3306: 'mysql', 5432: 'postgresql', 21: 'ftp', 25: 'smtp', 53: 'dns', 8443: 'https-alt', 9090: 'zeus-admin', 3389: 'ms-wbt-server' }[port] || 'unknown');

    const targetIP = randomIP();

    // The hacking script sequence
    const hackSequence = [
        { text: `\n  ██╗  ██╗ █████╗  ██████╗██╗  ██╗`, type: 'success', delay: 40 },
        { text: `  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝`, type: 'success', delay: 40 },
        { text: `  ███████║███████║██║     █████╔╝ `, type: 'success', delay: 40 },
        { text: `  ██╔══██║██╔══██║██║     ██╔═██╗ `, type: 'success', delay: 40 },
        { text: `  ██║  ██║██║  ██║╚██████╗██║  ██╗`, type: 'success', delay: 40 },
        { text: `  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`, type: 'success', delay: 40 },
        { text: ``, delay: 200 },
        { text: `[*] Inicializando módulos de reconhecimento...`, type: 'info', delay: 300 },
        { text: `[*] Carregando exploit database (CVE-2024)...`, type: 'info', delay: 200 },
        { text: `[+] 47,832 exploits carregados com sucesso`, type: 'success', delay: 150 },
        { text: ``, delay: 100 },
        { text: `root@kali:~# nmap -sV -sC -A ${targetIP}`, type: 'cmd', delay: 400 },
        { text: ``, delay: 200 },
        { text: `Starting Nmap 7.94 ( https://nmap.org )`, type: 'info', delay: 100 },
        { text: `Nmap scan report for ${targetIP}`, type: 'info', delay: 100 },
        { text: `Host is up (0.0045s latency).`, type: 'info', delay: 80 },
        { text: `MAC Address: ${randomMAC()} (VMware)`, type: 'info', delay: 80 },
        { text: ``, delay: 50 },
        { text: `PORT     STATE  SERVICE     VERSION`, type: 'info', delay: 80 },
    ];

    // Generate random port scan results
    const scannedPorts = [22, 80, 443, 8080, 3306];
    scannedPorts.forEach(port => {
        const svc = randomService(port);
        hackSequence.push({
            text: `${String(port).padEnd(4)}/tcp open   ${svc.padEnd(12)} ${svc === 'ssh' ? 'OpenSSH 8.9p1' : svc === 'http' ? 'Apache httpd 2.4.57' : svc === 'https' ? 'nginx 1.25.3' : svc === 'http-proxy' ? 'Tomcat 9.0.83' : 'MySQL 8.0.35'}`,
            type: 'info',
            delay: 60
        });
    });

    hackSequence.push(
        { text: ``, delay: 100 },
        { text: `[+] Scan completo: 5 portas abertas detectadas`, type: 'success', delay: 200 },
        { text: ``, delay: 100 },
        { text: `root@kali:~# msfconsole -q`, type: 'cmd', delay: 300 },
        { text: ``, delay: 100 },
        { text: `msf6 > use exploit/multi/handler`, type: 'cmd', delay: 200 },
        { text: `msf6 exploit(multi/handler) > set PAYLOAD linux/x64/meterpreter/reverse_tcp`, type: 'cmd', delay: 150 },
        { text: `PAYLOAD => linux/x64/meterpreter/reverse_tcp`, type: 'info', delay: 80 },
        { text: `msf6 exploit(multi/handler) > set LHOST ${randomIP()}`, type: 'cmd', delay: 150 },
        { text: `msf6 exploit(multi/handler) > set LPORT 4444`, type: 'cmd', delay: 100 },
        { text: `msf6 exploit(multi/handler) > exploit`, type: 'cmd', delay: 300 },
        { text: ``, delay: 100 },
        { text: `[*] Started reverse TCP handler on 0.0.0.0:4444`, type: 'info', delay: 200 },
        { text: `[*] Sending stage (3045380 bytes) to ${targetIP}`, type: 'info', delay: 300 },
        { text: `[*] Meterpreter session 1 opened at ${new Date().toLocaleTimeString()}`, type: 'success', delay: 200 },
        { text: ``, delay: 100 },
        { text: `meterpreter > sysinfo`, type: 'cmd', delay: 200 },
        { text: `Computer    : WESLEY-SERVER`, type: 'info', delay: 80 },
        { text: `OS          : Linux 6.1.0-kali (Debian 12.4)`, type: 'info', delay: 80 },
        { text: `Architecture: x86_64`, type: 'info', delay: 80 },
        { text: `Meterpreter : x64/linux`, type: 'info', delay: 80 },
        { text: ``, delay: 100 },
        { text: `meterpreter > hashdump`, type: 'cmd', delay: 300 },
        { text: `[*] Dumping password hashes...`, type: 'info', delay: 200 },
        { text: `root:$6$rNd0m$K8x...hash...bF/:0:0:root:/root:/bin/bash`, type: 'warn', delay: 100 },
        { text: `wesley:$6$s3Cur3$Px9...hash...mQ/:1000:1000::/home/wesley:/bin/bash`, type: 'warn', delay: 100 },
        { text: ``, delay: 100 },
        { text: `[+] Credenciais extraídas com sucesso!`, type: 'success', delay: 200 },
        { text: `[*] Escalando privilégios...`, type: 'info', delay: 300 },
        { text: `[+] Privilégio ROOT obtido!`, type: 'success', delay: 200 },
        { text: ``, delay: 150 },
        { text: `[██████████████████████████████] 100%`, type: 'success', delay: 400 },
        { text: ``, delay: 100 },
        { text: `[+] ACESSO TOTAL CONCEDIDO`, type: 'success', delay: 300 },
    );

    function addLine(text, type = 'info') {
        const line = document.createElement('div');
        line.className = `line-${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    async function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function typeText(text, type, charDelay = 8) {
        const line = document.createElement('div');
        line.className = `line-${type}`;
        output.appendChild(line);

        for (let i = 0; i < text.length; i++) {
            line.textContent += text[i];
            output.scrollTop = output.scrollHeight;
            if (type === 'cmd') {
                await sleep(charDelay + Math.random() * 15);
            }
        }
    }

    function unlockScroll() {
        // Remove touch prevention
        overlay.removeEventListener('touchmove', preventTouch);
        overlay.removeEventListener('touchstart', preventTouch);
        document.removeEventListener('touchmove', preventTouch);

        // Unlock body and restore scroll position
        document.body.classList.remove('locked');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
    }

    async function runHackSequence() {
        for (const step of hackSequence) {
            if (step.type === 'cmd') {
                await typeText(step.text, step.type);
            } else {
                addLine(step.text, step.type || 'info');
            }
            await sleep(step.delay || 100);
        }

        // Show ACCESS GRANTED
        await sleep(400);
        output.style.display = 'none';
        accessDiv.classList.remove('hidden');

        // Screen shake effect
        overlay.style.animation = 'shake 0.3s ease';

        // Wait and fade out
        await sleep(2000);
        overlay.classList.add('fade-out');
        unlockScroll();

        await sleep(800);
        overlay.remove();
    }

    // Add shake keyframes dynamically
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-5px, -3px); }
            20% { transform: translate(5px, 3px); }
            30% { transform: translate(-3px, 5px); }
            40% { transform: translate(3px, -5px); }
            50% { transform: translate(-5px, 3px); }
            60% { transform: translate(5px, -3px); }
            70% { transform: translate(-3px, -5px); }
            80% { transform: translate(3px, 5px); }
            90% { transform: translate(-5px, -3px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    runHackSequence();
})();

// ==========================
//  SCROLL REVEAL OBSERVER
// ==========================
(function () {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
})();