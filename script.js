const hotelData = [
    { name: "Royal Sapphire Resort", price: 32000, seats: 2, rating: "⭐⭐⭐⭐⭐", img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?w=500" },
    { name: "Oceanic Blue Suites", price: 18500, seats: 5, rating: "⭐⭐⭐⭐", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=500" },
    { name: "The Zenith Villa", price: 12000, seats: 1, rating: "⭐⭐⭐⭐⭐", img: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?w=500" }
];

let currentSelection = null;

function runSearch() {
    const city = document.getElementById('dest').value;
    if (!city) return alert("Please enter a destination!");

    document.getElementById('main-content').style.display = 'block';
    
    // Map Load
    const mapContainer = document.getElementById('map-frame-container');
    mapContainer.innerHTML = `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(city)}%20luxury%20hotels&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>`;

    // Render Hotels
    const list = document.getElementById('hotel-list');
    list.innerHTML = "";

    hotelData.forEach((h, i) => {
        list.innerHTML += `
            <div class="hotel-card">
                <div class="seat-tag">${h.seats} Rooms Left</div>
                <img src="${h.img}">
                <div style="padding:20px">
                    <span style="color:var(--gold)">${h.rating}</span>
                    <h2 style="margin:10px 0">${h.name}</h2>
                    <p style="font-size:24px; font-weight:bold; color:var(--gold)">৳ ${h.price.toLocaleString()}</p>
                    <button class="search-trigger" style="width:100%" onclick="openBooking(${i})">RESERVE NOW</button>
                </div>
            </div>`;
    });
    window.scrollTo({ top: 600, behavior: 'smooth' });
}

function openBooking(index) {
    currentSelection = index;
    document.getElementById('modal-hotel-name').innerText = hotelData[index].name;
    document.getElementById('modal-total-price').innerText = "Total: ৳" + hotelData[index].price.toLocaleString();
    document.getElementById('pay-modal').style.display = 'flex';
}

// পেমেন্ট প্রসেস এবং রিসিট দেখানো
function processPayment(method) {
    if (hotelData[currentSelection].seats > 0) {
        // সিট কমানো
        hotelData[currentSelection].seats -= 1;
        
        // রিসিট তৈরি করা
        generateReceipt(method);
        
        // পেমেন্ট মডাল বন্ধ করে রিসিট মডাল খোলা
        closeModal();
        document.getElementById('receipt-modal').style.display = 'flex';
        
        // রেজাল্ট আপডেট (যাতে সিট কম দেখায়)
        runSearch(); 
    } else {
        alert("Sold Out!");
    }
}

function generateReceipt(method) {
    const bookingID = "EB-" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleString();
    const hotel = hotelData[currentSelection];
    
    const receiptHTML = `
        <p>Booking ID: <span>${bookingID}</span></p>
        <p>Hotel: <span>${hotel.name}</span></p>
        <p>Location: <span>${document.getElementById('dest').value}</span></p>
        <p>Payment Method: <span>${method}</span></p>
        <p>Amount Paid: <span>৳ ${hotel.price.toLocaleString()}</span></p>
        <p>Date: <span>${date}</span></p>
        <p style="text-align:center; color:#2ed573; border:none; margin-top:15px;">Status: PAID & VERIFIED</p>
    `;
    document.getElementById('receipt-data').innerHTML = receiptHTML;
}

function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}

function closeModal() {
    document.getElementById('pay-modal').style.display = 'none';
}