// Import Firebase SDK (Add this at the beginning of the file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, getDoc, onSnapshot, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnZi5tyI1bCyiuykgej0RawxWEyNJeafc",
    authDomain: "AIzaSyDnZi5tyI1bCyiuykgej0RawxWEyNJeafc",
    projectId: "luvevirw",
    storageBucket: "luvevirw.firebasestorage.app",
    messagingSenderId: "166236779003",
    appId: "1:166236779003:web:1558767b34ae2befc49b5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to Firestore document
const viewersRef = doc(db, "live_viewers", "viewers");

// Function to update viewer count in real-time
function updateViewerCount() {
    onSnapshot(viewersRef, (docSnap) => {
        if (docSnap.exists()) {
            document.getElementById("live-viewers").innerText = "Live Viewers: " + docSnap.data().count;
        } else {
            console.log("No live viewer data found.");
        }
    });
}

// Call function to start listening for changes
updateViewerCount();

// Increase viewer count when user joins
async function increaseViewers() {
    await updateDoc(viewersRef, {
        count: increment(1)
    });
}

// Decrease viewer count when user leaves
async function decreaseViewers() {
    await updateDoc(viewersRef, {
        count: increment(-1)
    });
}

// Increase viewers when page loads
window.addEventListener("load", increaseViewers);

// Decrease viewers when user leaves
window.addEventListener("beforeunload", decreaseViewers);



        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }
        
        // Telegram Popup Functions
        function showPopup() {
            const popup = document.getElementById('telegramPopup');
            popup.classList.add('active');
        }
        
        function closePopup() {
            const popup = document.getElementById('telegramPopup');
            popup.classList.remove('active');
        }
        
        // Toggle fullscreen function for the fullscreen button
        document.addEventListener('DOMContentLoaded', function() {
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            
            fullscreenBtn.addEventListener('click', function() {
                const iframe = document.querySelector('iframe');
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) { /* Safari */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* IE11 */
                    iframe.msRequestFullscreen();
                }
            });

            // Show popup after a short delay every time
            setTimeout(showPopup, 2000);
        });
        
        // Try to hide popups in iframe
        window.addEventListener('load', function() {
            const iframe = document.querySelector('iframe');
            try {
                iframe.contentWindow.postMessage({ action: 'hidePopups' }, '*');
            } catch (e) {
                console.log('Could not communicate with iframe:', e);
            }
        });

        // QR Code generation
        window.addEventListener('load', function() {
            // Only run if we're on desktop
            if (window.innerWidth >= 1025) {
                const currentUrl = window.location.href;
                document.getElementById('current-url').textContent = currentUrl;
                
                // Clear previous QR code if any
                const qrcodeDiv = document.getElementById("qrcode");
                qrcodeDiv.innerHTML = '';
                
                // Create QR Code with better options
                new QRCode(qrcodeDiv, {
                    text: currentUrl,
                    width: 180,
                    height: 180,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H,
                    margin: 2
                });
            }
        });
    
