// ===== PRELOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hide");
  }, 1200);
});

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// ===== MOBILE MENU =====
const mobileMenu = document.getElementById("mobileMenu");
document.getElementById("hamburger").onclick = () => mobileMenu.classList.add("open");
document.getElementById("closeMenu").onclick = () => mobileMenu.classList.remove("open");
function closeMobileMenu() { mobileMenu.classList.remove("open"); }

// ===== MENU DATA =====
const menuItems = [
  {name:"Red Horse Beer", price:90, cat:"beer", img:"images/rh.jpg"},
  {name:"San Miguel Pale Pilsen", price:80, cat:"beer", img:"images/sm.jpg"},
  {name:"Tanduay Rum", price:120, cat:"spirits", img:"images/tanduay.jpg"},
  {name:"Emperador Brandy", price:130, cat:"spirits", img:"images/empi.png"},
  {name:"Mojito", price:150, cat:"cocktails", img:"images/mojito.jpg"},
  {name:"Sisig", price:180, cat:"pulutan", img:"images/sisig.jpg"}
];

// ===== RENDER MENU =====
const menuGrid = document.getElementById("menuGrid");

function renderMenu(filter="all") {
  menuGrid.innerHTML = "";
  menuItems
    .filter(item => filter==="all" || item.cat===filter)
    .forEach(item => {
      menuGrid.innerHTML += `
        <div class="menu-card">
          <img src="${item.img}">
          <div class="menu-card-body">
            <h3>${item.name}</h3>
            <p class="menu-desc">Popular choice</p>
            <div class="menu-footer">
              <span class="menu-price">₱${item.price}</span>
              <button class="add-btn" onclick="addToCart('${item.name}',${item.price})">Add</button>
            </div>
          </div>
        </div>`;
    });
}
renderMenu();

// ===== TABS =====
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.cat);
  };
});

// ===== CART SYSTEM =====
let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({name, price});
  total += price;

  document.getElementById("cartCount").innerText = cart.length;
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cartBar").classList.add("visible");
}

// ===== CHECKOUT =====
function checkout() {
  const summary = document.getElementById("orderSummary");
  summary.innerHTML = "";
  cart.forEach(item => {
    summary.innerHTML += `<div class="order-item">${item.name}<span>₱${item.price}</span></div>`;
  });
  document.getElementById("orderTotal").innerText = total;
  document.getElementById("checkoutModal").classList.add("open");
}

function closeModal() {
  document.getElementById("checkoutModal").classList.remove("open");
}

// ===== PLACE ORDER =====
function placeOrder() {
  const name = document.getElementById("orderName").value;
  if(!name) return alert("Enter your name");

  document.getElementById("orderMsg").innerText = "✅ Order placed! Pay at the bar.";
  cart = [];
  total = 0;

  document.getElementById("cartCount").innerText = 0;
  document.getElementById("cartTotal").innerText = 0;
  document.getElementById("cartBar").classList.remove("visible");
}

// ===== RESERVATION =====
function submitReservation() {
  const name = document.getElementById("resName").value;
  if(!name) return alert("Enter name");

  document.getElementById("resMsg").innerText = "✅ Reservation confirmed!";
}

// ===== STATS COUNTER =====
document.querySelectorAll(".stat-num").forEach(el => {
  let target = +el.dataset.target;
  let count = 0;

  let interval = setInterval(() => {
    count += Math.ceil(target/50);
    if(count >= target) {
      el.innerText = target;
      clearInterval(interval);
    } else {
      el.innerText = count;
    }
  }, 30);
});

// animate bars
document.querySelectorAll(".stat-fill").forEach(bar => {
  setTimeout(()=> bar.classList.add("animate"), 500);
});

// ===== CHART.JS =====
const ctx = document.getElementById("analyticsChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Customers",
        data: [120,150,130,170,300,450,380],
        borderColor: "#c8a84b",
        tension: 0.4
      },
      {
        label: "Revenue (₱)",
        data: [5000,6000,5500,7000,12000,18000,15000],
        borderColor: "#b83232",
        tension: 0.4
      }
    ]
  }
});

// ===== EVENTS =====
const events = [
  {day:"12", month:"JUL", title:"Live Band Night", desc:"OPM hits & acoustic vibes", tag:"Live"},
  {day:"18", month:"JUL", title:"Ladies Night", desc:"Free cocktails for ladies", tag:"Promo"},
  {day:"25", month:"JUL", title:"DJ Party", desc:"EDM & Hip-hop all night", tag:"Party"}
];

const eventsGrid = document.getElementById("eventsGrid");
events.forEach(e => {
  eventsGrid.innerHTML += `
    <div class="event-card">
      <div class="event-date">
        <div class="event-day">${e.day}</div>
        <div class="event-month">${e.month}</div>
      </div>
      <div class="event-body">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <span class="event-tag">${e.tag}</span>
      </div>
    </div>`;
});

// ===== TESTIMONIAL SLIDER =====
let index = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTest(i){
  testimonials.forEach(t => t.classList.remove("active"));
  testimonials[i].classList.add("active");
}

function nextTest(){
  index = (index + 1) % testimonials.length;
  showTest(index);
}

function prevTest(){
  index = (index - 1 + testimonials.length) % testimonials.length;
  showTest(index);
}

showTest(index);

// ===== BASIC ANALYTICS =====
if(localStorage.visits){
  localStorage.visits = Number(localStorage.visits) + 1;
} else {
  localStorage.visits = 1;
}
console.log("Visitors:", localStorage.visits);