const SHIVAPUTRA_WHATSAPP = "917338939339";

// 1. Page Switcher (Hides all .page containers and opens the selected one)
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active-page');

  // Update Desktop Nav active indicator
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) activeNav.classList.add('active');

  // Update Mobile Drawer Nav active indicator
  document.querySelectorAll('.drawer-links a').forEach(link => link.classList.remove('active'));
  const activeDrawerNav = document.getElementById('drawer-' + pageId);
  if (activeDrawerNav) activeDrawerNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. Package Filter Switcher (Temple vs Holiday vs All)
function filterPackages(category) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById('filter-' + category);
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('.filterable-item');
  items.forEach(item => {
    if (category === 'all') {
      item.style.display = 'flex';
    } else if (item.classList.contains('item-' + category)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function switchTourTab(category) {
  showPage('packages');
  filterPackages(category);
  const filterTabs = document.querySelector('.filter-tabs');
  if (filterTabs) {
    const yOffset = -90;
    const y = filterTabs.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// 3. Central WhatsApp Link Dispatcher
function sendToWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${SHIVAPUTRA_WHATSAPP}?text=${encodedMsg}`;
  window.open(url, '_blank');
}

function openDirectWhatsApp(context) {
  sendToWhatsApp(`Hello Shivaputra Travels! I would like to inquire about: ${context}`);
}

// 4. Package Pricing Query Trigger
function enquirePackage(packageName) {
  const msg = `Hello Shivaputra Travels! I am interested in booking the "${packageName}". Please share the pricing details, inclusions, and available vehicle options.`;
  sendToWhatsApp(msg);
}

// 5. Vehicle Pricing Query Trigger
function enquireVehicle(vehicleName) {
  const msg = `Hello Shivaputra Travels! I would like to know the rental tariff and availability for your "${vehicleName}".`;
  sendToWhatsApp(msg);
}

// 5.5 Category Tour Packages Switcher for Plan Your Journey
const BOOKING_TOUR_OPTIONS = {
  temple: [
    { val: "Tirupati VIP Balaji Darshan (1 Day)", label: "Tirupati VIP Balaji Darshan (1 Day)" },
    { val: "Chennai to Aarupadai Veedu (6 Days)", label: "Chennai to Aarupadai Veedu (6 Days)" },
    { val: "Navagraha Temple Tour (3 Days)", label: "Navagraha Temple Tour (3 Days)" },
    { val: "Thiruvannamalai Girivalam Special (1 Day)", label: "Thiruvannamalai Girivalam Special (1 Day)" },
    { val: "Kanchipuram & Mahabalipuram Temple Tour (1 Day)", label: "Kanchipuram & Mahabalipuram (1 Day)" },
    { val: "Rameshwaram & Madurai Divine Yatra (4 Days)", label: "Rameshwaram & Madurai Yatra (4 Days)" },
    { val: "Chidambaram & Kumbakonam Temple Tour (2 Days)", label: "Chidambaram & Kumbakonam (2 Days)" }
  ],
  holiday: [
    { val: "Ooty & Coonoor Hill Escape (3 Days)", label: "Ooty & Coonoor Hill Escape (3 Days)" },
    { val: "Kodaikanal Queen of Hills (3 Days)", label: "Kodaikanal Queen of Hills (3 Days)" },
    { val: "Pondicherry & ECR Beach Retreat (2 Days)", label: "Pondicherry & ECR Beach Retreat (2 Days)" },
    { val: "Munnar & Alleppey Backwaters (4 Days)", label: "Munnar & Alleppey Backwaters (4 Days)" },
    { val: "Yercaud Hill Station Getaway (2 Days)", label: "Yercaud Hill Station Getaway (2 Days)" },
    { val: "Wayanad Nature & Wildlife Tour (3 Days)", label: "Wayanad Nature & Wildlife Tour (3 Days)" }
  ],
  local: [
    { val: "Chennai Local (5 Hrs / 50 Kms)", label: "Chennai Local (5 Hrs / 50 Kms)" },
    { val: "Chennai Local Full Day (10 Hrs / 100 Kms)", label: "Chennai Local Full Day (10 Hrs / 100 Kms)" },
    { val: "Chennai Airport Transfer (Drop / Pickup)", label: "Chennai Airport Transfer (Drop / Pickup)" },
    { val: "Chennai Central / Egmore Railway Transfer", label: "Chennai Railway Transfer" }
  ],
  outstation: [
    { val: "Custom Outstation Trip (Per Km Basis)", label: "Custom Outstation Trip (Per Km Basis)" },
    { val: "Multi-City Tamil Nadu Tour", label: "Multi-City Tamil Nadu Tour" },
    { val: "Interstate South India Tour", label: "Interstate South India Tour" }
  ]
};

function setBookingCategory(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.book-cat-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
  const selectElem = document.getElementById('home-tour-type');
  if (!selectElem) return;

  const options = BOOKING_TOUR_OPTIONS[category] || BOOKING_TOUR_OPTIONS['temple'];
  const defaultOpt = `<option value="" disabled selected>-- Select Tour Package --</option>`;
  selectElem.innerHTML = defaultOpt + options.map(opt => `<option value="${opt.val}">${opt.label}</option>`).join('');
}

// 6. Plan Your Journey Form Submission
function submitHomeEnquiry() {
  const tour = document.getElementById('home-tour-type').value || "General Package Inquiry";
  const vehicle = document.getElementById('home-vehicle').value || "Vehicle to be suggested";
  const pickup = document.getElementById('home-pickup').value || "Chennai (Doorstep)";
  const date = document.getElementById('home-date').value || "Flexible / Not selected";
  const pax = document.getElementById('home-pax').value || "To be specified";

  const message = `*NEW TRIP ENQUIRY - SHIVAPUTHRA TRAVELS*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `🛕 *Package / Route:* ${tour}\n` +
                  `🚗 *Vehicle Preference:* ${vehicle}\n` +
                  `📍 *Pickup Location:* ${pickup}\n` +
                  `📅 *Date of Journey:* ${date}\n` +
                  `👥 *Passengers:* ${pax}\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Please share vehicle availability and the all-inclusive pricing quote.`;

  sendToWhatsApp(message);
}

// 7. Corporate Form Submission
function submitCorporateEnquiry() {
  const company = document.getElementById('corp-company')?.value || "Not specified";
  const person = document.getElementById('corp-name')?.value || "Corporate Representative";
  const email = document.getElementById('corp-email')?.value || "Not specified";
  const phone = document.getElementById('corp-phone')?.value || "Not specified";
  const fleet = document.getElementById('corp-fleet')?.value || "Executive Fleet";
  const req = document.getElementById('corp-req')?.value || "Fleet Rates & Tariff";

  const msg = `*CORPORATE MOBILITY ENQUIRY - SHIVAPUTHRA TRAVELS*\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `🏢 *Company:* ${company}\n` +
              `👤 *Contact Person:* ${person}\n` +
              `✉️ *Work Email:* ${email}\n` +
              `📞 *Phone / WhatsApp:* ${phone}\n` +
              `🚗 *Fleet Required:* ${fleet}\n` +
              `📋 *Requirement Scope:* ${req}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `Please share your official corporate rate card and GST monthly account credit terms.`;
  sendToWhatsApp(msg);
}

function openDirectWhatsApp(topic) {
  const msg = `Hello Shivaputhra Travels! I am inquiring about "${topic}" for our corporate fleet requirements. Please connect with our team.`;
  sendToWhatsApp(msg);
}

// 8. Fleet Category Filter
function filterFleet(category, element) {
  document.querySelectorAll('.fleet-tab-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  const items = document.querySelectorAll('.fleet-item');
  items.forEach(item => {
    if (category === 'all') {
      item.style.display = 'flex';
    } else if (item.classList.contains('fleet-' + category)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// 9. Direct Booking Action for Specific Vehicle
function bookFleetVehicle(vehicleName) {
  const msg = `Hello Shivaputra Travels! I would like to book the "${vehicleName}" from your fleet tariff. Please verify availability and share next booking steps.`;
  sendToWhatsApp(msg);
}

// 10. Automatic 1.5-second Hero Background Slider
// Synchronized 1.5-Second Hero Image & Content Slider
// Synchronized 1.5-Second Hero Image & Content Slider (4 Items)
// Synchronized 2-Second Hero Image & Content Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const textBlocks = document.querySelectorAll('.hero-text-block');

if (slides.length > 0 && textBlocks.length > 0) {
  setInterval(() => {
    slides[currentSlideIndex].classList.remove('active-slide');
    textBlocks[currentSlideIndex].classList.remove('active-text');

    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    slides[currentSlideIndex].classList.add('active-slide');
    textBlocks[currentSlideIndex].classList.add('active-text');
  }, 2000); // Changed to 2 seconds (2000ms)
}

// Mobile Side-Drawer Menu Handlers
function toggleMobileMenu(isOpen) {
  const drawer = document.getElementById('side-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (isOpen) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleDrawerNav(pageId) {
  toggleMobileMenu(false);
  showPage(pageId);
}

function handleDrawerSubNav(category) {
  toggleMobileMenu(false);
  switchTourTab(category);
}

// Close drawer on Escape key press
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    toggleMobileMenu(false);
  }
});

// 11. Premium Overlapping Testimonial Stack Carousel
let currentStackIndex = 1;
const totalStackCards = 3;
let stackAutoTimer = null;

function updateStackCarousel() {
  const container = document.getElementById('testimonialStackContainer');
  if (!container) return;
  const cards = container.querySelectorAll('.stack-card');
  const dots = document.querySelectorAll('.review-dot');

  cards.forEach((card, idx) => {
    card.classList.remove('card-center', 'card-left', 'card-right', 'card-hidden');

    const diff = (idx - currentStackIndex + totalStackCards) % totalStackCards;

    if (diff === 0) {
      card.classList.add('card-center');
    } else if (diff === 1) {
      card.classList.add('card-right');
    } else if (diff === 2) {
      card.classList.add('card-left');
    } else {
      card.classList.add('card-hidden');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentStackIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function startStackAutoSlide() {
  if (stackAutoTimer) clearInterval(stackAutoTimer);
  stackAutoTimer = setInterval(() => {
    currentStackIndex = (currentStackIndex + 1) % totalStackCards;
    updateStackCarousel();
  }, 4000); // 4 Seconds Auto Slide
}

function nextStackCard() {
  currentStackIndex = (currentStackIndex + 1) % totalStackCards;
  updateStackCarousel();
  startStackAutoSlide();
}

function prevStackCard() {
  currentStackIndex = (currentStackIndex - 1 + totalStackCards) % totalStackCards;
  updateStackCarousel();
  startStackAutoSlide();
}

function goToStackCard(index) {
  currentStackIndex = index;
  updateStackCarousel();
  startStackAutoSlide();
}

let stackTouchStartX = 0;
let stackTouchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
  updateStackCarousel();
  startStackAutoSlide();

  const stackContainer = document.getElementById('testimonialStackContainer');
  if (stackContainer) {
    stackContainer.addEventListener('touchstart', e => {
      stackTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stackContainer.addEventListener('touchend', e => {
      stackTouchEndX = e.changedTouches[0].screenX;
      const diff = stackTouchStartX - stackTouchEndX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          nextStackCard();
        } else {
          prevStackCard();
        }
      }
    }, { passive: true });
  }
});
