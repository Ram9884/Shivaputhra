const SHIVAPUTRA_WHATSAPP = "917338939339";

// 1. Page Switcher (Hides all .page containers and opens the selected one)
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });

  // Alias generic 'packages' to 'temple-packages'
  let actualPageId = pageId;
  if (pageId === 'packages') actualPageId = 'temple-packages';

  const target = document.getElementById('page-' + actualPageId);
  if (target) target.classList.add('active-page');

  // Update Desktop Nav active indicator
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  let activeNavId = 'nav-' + actualPageId;
  if (actualPageId === 'temple-packages' || actualPageId === 'holiday-packages' || actualPageId === 'tirupati-packages' || actualPageId === 'outstation-packages') {
    activeNavId = 'nav-packages';
  }
  const activeNav = document.getElementById(activeNavId);
  if (activeNav) activeNav.classList.add('active');

  // Update Mobile Drawer Nav active indicator
  document.querySelectorAll('.drawer-links a').forEach(link => link.classList.remove('active'));
  let activeDrawerId = 'drawer-' + actualPageId;
  if (actualPageId === 'temple-packages' || actualPageId === 'holiday-packages' || actualPageId === 'tirupati-packages' || actualPageId === 'outstation-packages') {
    activeDrawerId = 'drawer-packages';
  }
  const activeDrawerNav = document.getElementById(activeDrawerId);
  if (activeDrawerNav) activeDrawerNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Package Category Switcher
function filterPackages(category) {
  switchTourTab(category);
}

function switchTourTab(category) {
  if (category === 'holiday') {
    showPage('holiday-packages');
  } else if (category === 'tirupati') {
    showPage('tirupati-packages');
  } else if (category === 'outstation') {
    showPage('outstation-packages');
  } else {
    showPage('temple-packages');
  }
}

function handleDrawerSubNav(category) {
  toggleMobileMenu(false);
  switchTourTab(category);
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
  tirupati: [
    { val: "Chennai to Tirupati Express VIP Balaji Darshan (1 Day)", label: "Tirupati VIP Balaji Darshan (1 Day Express)" },
    { val: "Tirupati - Kalahasti - Kanipakam Divine Yatra (2 Days)", label: "Tirupati - Kalahasti - Kanipakam (2 Days)" },
    { val: "Tirupati VIP Darshan by Innova Crysta", label: "Tirupati Innova Crysta VIP Package" },
    { val: "Tirupati Group Yatra by Tempo Traveller", label: "Tirupati Tempo Traveller / Urbania Group Yatra" },
    { val: "Chennai Airport to Tirupati Direct Balaji Yatra", label: "Chennai Airport Direct Tirupati Yatra" },
    { val: "Tirupati - Golden Temple Vellore - Kanchipuram Yatra", label: "Tirupati + Golden Temple + Kanchipuram Yatra" }
  ],
  temple: [
    { val: "Grand South Indian Temple Tour (10 Days / 9 Nights)", label: "Grand South Indian Temple Tour (10 Days / 9 Nights) ⭐" },
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

// 7b. Contact Us Form Submission
function handleContactSubmit(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('contact-name')?.value || "Customer";
  const phone = document.getElementById('contact-phone')?.value || "Not specified";
  const service = document.getElementById('contact-service')?.value || "General Query";
  const msgText = document.getElementById('contact-msg')?.value || "No additional message";

  const message = `*CONTACT US INQUIRY - SHIVAPUTHRA TRAVELS*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `👤 *Name:* ${name}\n` +
                  `📞 *Phone:* ${phone}\n` +
                  `🛕 *Service Interested:* ${service}\n` +
                  `💬 *Message:* ${msgText}\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Please get back to me with trip quote and details.`;

  sendToWhatsApp(message);
}

// 7c. Car Rental Form Submission
function submitCarRentalEnquiry() {
  const name = document.getElementById('rental-name')?.value || "Customer";
  const phone = document.getElementById('rental-phone')?.value || "Not specified";
  const vehicle = document.getElementById('rental-vehicle')?.value || "Vehicle Rental";
  const triptype = document.getElementById('rental-triptype')?.value || "Outstation Trip";
  const dest = document.getElementById('rental-destination')?.value || "Not specified";
  const date = document.getElementById('rental-date')?.value || "Not specified";

  const msg = `*CAR RENTAL INQUIRY - SHIVAPUTHRA TRAVELS*\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 *Name:* ${name}\n` +
              `📞 *Phone / WhatsApp:* ${phone}\n` +
              `🚗 *Vehicle Model:* ${vehicle}\n` +
              `🗺️ *Trip Type:* ${triptype}\n` +
              `📍 *Destination / Route:* ${dest}\n` +
              `📅 *Travel Date / Duration:* ${date}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `Please share tariff details and availability for this vehicle.`;
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
// Synchronized 3-Second Hero Image & Content Slider with Dot Navigation
let currentSlideIndex = 0;
let slideInterval = null;
const slides = document.querySelectorAll('.hero-slide');
const textBlocks = document.querySelectorAll('.hero-text-block');
const heroDots = document.querySelectorAll('.hero-dot');

function goToSlide(index) {
  if (slides.length === 0 || textBlocks.length === 0) return;
  
  slides[currentSlideIndex].classList.remove('active-slide');
  textBlocks[currentSlideIndex].classList.remove('active-text');
  if (heroDots.length > currentSlideIndex) {
    heroDots[currentSlideIndex].classList.remove('active');
  }

  currentSlideIndex = index;

  slides[currentSlideIndex].classList.add('active-slide');
  textBlocks[currentSlideIndex].classList.add('active-text');
  if (heroDots.length > currentSlideIndex) {
    heroDots[currentSlideIndex].classList.add('active');
  }

  startSlideTimer();
}

function startSlideTimer() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 3000); // 3 seconds (3000ms) autoplay
}

if (slides.length > 0 && textBlocks.length > 0) {
  startSlideTimer();
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

function toggleMobileSubmenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const dropdown = document.getElementById('drawer-dropdown-item');
  if (dropdown) {
    dropdown.classList.toggle('open');
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

// Reviews Auto-Moving Carousel Engine
let currentRevIndex = 0;
let currentRevSource = 'all';
let revAutoTimer = null;

function getActiveRevCards() {
  const cards = Array.from(document.querySelectorAll('.review-item-card'));
  if (currentRevSource === 'all') return cards;
  return cards.filter(c => c.getAttribute('data-source') === currentRevSource);
}

function updateRevCarousel() {
  const activeCards = getActiveRevCards();
  const allCards = document.querySelectorAll('.review-item-card');
  
  // Hide all cards first
  allCards.forEach(c => {
    c.classList.remove('active-slide');
    c.style.display = 'none';
  });

  if (activeCards.length === 0) return;

  if (currentRevIndex >= activeCards.length) currentRevIndex = 0;
  if (currentRevIndex < 0) currentRevIndex = activeCards.length - 1;

  const currentCard = activeCards[currentRevIndex];
  if (currentCard) {
    currentCard.style.display = 'block';
    currentCard.classList.add('active-slide');
  }

  // Render dots
  const dotsContainer = document.getElementById('rev-dots-container');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    activeCards.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'rev-dot' + (idx === currentRevIndex ? ' active-dot' : '');
      dot.onclick = () => {
        currentRevIndex = idx;
        updateRevCarousel();
        resetRevTimer();
      };
      dotsContainer.appendChild(dot);
    });
  }

  // Update slide counter text
  const counter = document.getElementById('rev-slide-counter');
  if (counter) {
    counter.innerText = `${currentRevIndex + 1} / ${activeCards.length}`;
  }
}

function nextReviewSlide() {
  currentRevIndex++;
  updateRevCarousel();
}

function prevReviewSlide() {
  currentRevIndex--;
  updateRevCarousel();
}

function startRevTimer() {
  stopRevTimer();
  revAutoTimer = setInterval(() => {
    nextReviewSlide();
  }, 4500);
}

function stopRevTimer() {
  if (revAutoTimer) {
    clearInterval(revAutoTimer);
    revAutoTimer = null;
  }
}

function resetRevTimer() {
  startRevTimer();
}

function filterReviewSource(source) {
  currentRevSource = source;
  currentRevIndex = 0;

  const tabs = document.querySelectorAll('.rev-tab');
  tabs.forEach(t => {
    t.style.borderBottom = '3px solid transparent';
    t.style.color = 'var(--text-muted)';
    t.style.fontWeight = '600';
  });

  const activeTab = document.getElementById('rev-tab-' + source);
  if (activeTab) {
    activeTab.style.borderBottom = '3px solid var(--accent)';
    activeTab.style.color = 'var(--primary)';
    activeTab.style.fontWeight = '700';
  }

  updateRevCarousel();
  resetRevTimer();
}

// Auto-start carousel on page load & initialize mobile touch swipe listeners
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('rev-carousel-box');
  let touchStartX = 0;
  let touchEndX = 0;

  if (box) {
    box.addEventListener('mouseenter', stopRevTimer);
    box.addEventListener('mouseleave', startRevTimer);

    // Touch swipe support for mobile view
    box.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopRevTimer();
    }, { passive: true });

    box.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startRevTimer();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 35;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextReviewSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevReviewSlide();
    }
  }

  updateRevCarousel();
  startRevTimer();
});

// Car Rental Fleet Category Filter
function filterCarRentalFleet(cat) {
  const btns = document.querySelectorAll('.car-filter-btn');
  btns.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById('car-tab-' + cat);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.car-fleet-card-item');
  cards.forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* =========================================================
   MANDATORY ENTRY ENQUIRY MODAL CONTROLLER
   ========================================================= */

const MANDATORY_TOUR_SUBTYPES = {
  temple: [
    { val: "Tirupati VIP Balaji Darshan (1 Day / 2 Days)", label: "Tirupati VIP Balaji Darshan Package (1 Day / 2 Days)" },
    { val: "Grand South Indian Temple Tour (10 Days)", label: "Grand South Indian Temple Tour (10 Days / 9 Nights)" },
    { val: "Chennai to Aarupadai Veedu Murugan Yatra (6 Days)", label: "Chennai to Aarupadai Veedu Murugan Yatra (6 Days)" },
    { val: "Navagraha Temples Special Tour (3 Days)", label: "Navagraha Temples Special Tour (3 Days)" },
    { val: "Thiruvannamalai Girivalam Package (1 Day)", label: "Thiruvannamalai Girivalam Special (1 Day)" },
    { val: "Rameshwaram & Madurai Divine Yatra (4 Days)", label: "Rameshwaram & Madurai Divine Yatra (4 Days)" },
    { val: "Kanchipuram & Mahabalipuram Temple Tour (1 Day)", label: "Kanchipuram & Mahabalipuram Tour (1 Day)" },
    { val: "Chidambaram & Kumbakonam Temple Tour (2 Days)", label: "Chidambaram & Kumbakonam Tour (2 Days)" },
    { val: "Customized Temple Yatra / Pilgrimage", label: "Customized Temple Yatra / Other Pilgrimage" }
  ],
  holiday: [
    { val: "Ooty & Coonoor Hill Escape (3 Days)", label: "Ooty & Coonoor Hill Escape (3 Days)" },
    { val: "Kodaikanal Queen of Hills (3 Days)", label: "Kodaikanal Hill Getaway (3 Days)" },
    { val: "Munnar & Alleppey Backwaters Kerala (4 Days)", label: "Munnar & Alleppey Backwaters (4 Days)" },
    { val: "Pondicherry & ECR Beach Retreat (2 Days)", label: "Pondicherry & ECR Beach Retreat (2 Days)" },
    { val: "Yercaud Hill Station Getaway (2 Days)", label: "Yercaud Hill Station Getaway (2 Days)" },
    { val: "Wayanad Nature & Wildlife Tour (3 Days)", label: "Wayanad Nature & Wildlife Tour (3 Days)" },
    { val: "Custom Family Holiday Package", label: "Custom Family Holiday / Vacation Package" }
  ],
  rental: [
    { val: "Chennai Local Sightseeing (5 Hrs / 10 Hrs)", label: "Chennai Local Sightseeing (5 Hrs / 10 Hrs)" },
    { val: "Outstation Round Trip / One-Way Drop Taxi", label: "Outstation Round Trip / One-Way Drop Taxi" },
    { val: "Chennai Airport / Railway Station Transfer", label: "Chennai Airport / Railway Station Transfer" },
    { val: "Innova Crysta VIP Luxury Rental", label: "Innova Crysta VIP Luxury Rental" },
    { val: "12/17 Seater Tempo Traveller Booking", label: "12 / 17 Seater Tempo Traveller Booking" },
    { val: "Force Urbania Luxury Van Booking", label: "Force Urbania Luxury Van Booking" }
  ],
  corporate: [
    { val: "Corporate Employee Daily Transportation", label: "Corporate Employee Daily Transportation" },
    { val: "Executive Event & VIP Delegation Fleet", label: "Executive Event & VIP Delegation Fleet" },
    { val: "Monthly Dedicated Fleet Long-Term Contract", label: "Monthly Dedicated Fleet Contract" },
    { val: "Outstation Corporate Retreat / Team Outing", label: "Outstation Corporate Retreat / Team Outing" }
  ]
};

function onTourTypeChange(tourType) {
  const subTypeElem = document.getElementById('entry-subtype');
  if (!subTypeElem) return;

  const options = MANDATORY_TOUR_SUBTYPES[tourType] || [];
  
  if (options.length === 0) {
    subTypeElem.innerHTML = `<option value="" disabled selected>-- First Select Tour Type Above --</option>`;
  } else {
    let optionsHtml = `<option value="" disabled selected>-- Select Specific Package / Route --</option>`;
    options.forEach(opt => {
      optionsHtml += `<option value="${opt.val}">${opt.label}</option>`;
    });
    subTypeElem.innerHTML = optionsHtml;
  }

  // Clear any existing error state
  clearFieldError(document.getElementById('entry-tour-type'));
  clearFieldError(subTypeElem);
}

function closeEntryModal() {
  const overlay = document.getElementById('mandatory-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    sessionStorage.setItem('shivaputhra_initial_enquiry_done', 'true');
  }
}

function initMandatoryEntryModal() {
  const overlay = document.getElementById('mandatory-modal-overlay');
  const card = document.getElementById('mandatory-modal-card');
  const dateInput = document.getElementById('entry-date');

  if (!overlay || !card) return;

  // Set minimum travel date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Check if visitor has already submitted or closed during this session
  const hasSubmitted = sessionStorage.getItem('shivaputhra_initial_enquiry_done');
  
  if (!hasSubmitted) {
    // Show modal immediately on page load
    setTimeout(() => {
      overlay.classList.add('active');
      document.body.classList.add('modal-open');
    }, 250);
  }

  // Allow clicking outside on backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeEntryModal();
    }
  });

  // Allow Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeEntryModal();
    }
  });

  // Remove field error highlight on user typing / selection
  const formInputs = overlay.querySelectorAll('input, select');
  formInputs.forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });
}

function clearFieldError(inputElem) {
  if (!inputElem) return;
  const wrapper = inputElem.closest('.input-icon-wrapper');
  if (wrapper) wrapper.classList.remove('has-error');
  const errText = document.getElementById('err-' + inputElem.id);
  if (errText) errText.classList.remove('visible');
}

function shakeMandatoryModal() {
  const card = document.getElementById('mandatory-modal-card');
  const alertBanner = document.getElementById('mandatory-alert-banner');
  if (!card) return;

  card.classList.remove('card-shake');
  // Trigger reflow
  void card.offsetWidth;
  card.classList.add('card-shake');

  if (alertBanner) {
    alertBanner.classList.add('visible');
  }

  setTimeout(() => {
    card.classList.remove('card-shake');
  }, 600);
}

function handleMandatoryEnquiry(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('entry-name');
  const phoneInput = document.getElementById('entry-phone');
  const tourTypeInput = document.getElementById('entry-tour-type');
  const subTypeInput = document.getElementById('entry-subtype');
  const pickupInput = document.getElementById('entry-pickup');
  const dateInput = document.getElementById('entry-date');
  const travelersInput = document.getElementById('entry-travelers');
  const purposeInput = document.getElementById('entry-purpose');
  const notesInput = document.getElementById('entry-notes');

  let isValid = true;
  let firstInvalid = null;

  function markError(inputElem, customMsg) {
    isValid = false;
    if (!firstInvalid) firstInvalid = inputElem;
    const wrapper = inputElem ? inputElem.closest('.input-icon-wrapper') : null;
    if (wrapper) wrapper.classList.add('has-error');
    if (inputElem) {
      const errText = document.getElementById('err-' + inputElem.id);
      if (errText) {
        if (customMsg) errText.textContent = customMsg;
        errText.classList.add('visible');
      }
    }
  }

  // 1. Full Name validation
  const nameVal = nameInput ? nameInput.value.trim() : '';
  if (!nameVal || nameVal.length < 2) {
    markError(nameInput, 'Please enter your full name');
  }

  // 2. Phone validation (10 digits)
  const phoneVal = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
  if (!phoneVal || phoneVal.length < 10) {
    markError(phoneInput, 'Please enter a valid 10-digit mobile number');
  }

  // 3. Tour Type validation
  const tourTypeVal = tourTypeInput ? tourTypeInput.value : '';
  if (!tourTypeVal) {
    markError(tourTypeInput, 'Please select a tour type');
  }

  // 4. Sub Type validation
  const subTypeVal = subTypeInput ? subTypeInput.value : '';
  if (!subTypeVal) {
    markError(subTypeInput, 'Please select a specific package or route');
  }

  // 5. Pickup Location validation
  const pickupVal = pickupInput ? pickupInput.value.trim() : '';
  if (!pickupVal) {
    markError(pickupInput, 'Please enter your pickup location / city');
  }

  // 6. Expected Travel Date validation
  const dateVal = dateInput ? dateInput.value : '';
  if (!dateVal) {
    markError(dateInput, 'Please select your planned travel date');
  }

  // 7. No. of Travelers validation
  const travelersVal = travelersInput ? travelersInput.value : '';
  if (!travelersVal) {
    markError(travelersInput, 'Please select number of travellers');
  }

  // 8. Purpose of Visiting validation
  const purposeVal = purposeInput ? purposeInput.value : '';
  if (!purposeVal) {
    markError(purposeInput, 'Please select your purpose of visiting');
  }

  if (!isValid) {
    shakeMandatoryModal();
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const notesVal = notesInput ? notesInput.value.trim() : '';
  const tourTypeLabel = tourTypeInput.options[tourTypeInput.selectedIndex]?.text || tourTypeVal;

  // Disable button and show progress state
  const submitBtn = document.getElementById('btn-mandatory-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span><i class="fas fa-spinner fa-spin"></i> Submitting & Opening Website...</span>`;
  }

  // Format rich WhatsApp Enquiry Message
  const whatsappMessage = 
    `*✨ NEW TRIP ENQUIRY - SHIVAPUTHRA TRAVELS ✨*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Customer Name:* ${nameVal}\n` +
    `📞 *Phone / WhatsApp:* +91 ${phoneVal}\n` +
    `🧭 *Tour Category:* ${tourTypeLabel}\n` +
    `🛕 *Specific Package / Route:* ${subTypeVal}\n` +
    `📍 *Pickup City / Area:* ${pickupVal}\n` +
    `📅 *Expected Travel Date:* ${dateVal}\n` +
    `👥 *No. of Travellers:* ${travelersVal}\n` +
    `🎯 *Purpose of Visit:* ${purposeVal}\n` +
    (notesVal ? `💬 *Additional Notes:* ${notesVal}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Hello Shivaputhra Travels! Please share vehicle options, tour package itinerary, and best all-inclusive quote for this requirement.`;

  // Save session & lead storage so user is registered
  sessionStorage.setItem('shivaputhra_initial_enquiry_done', 'true');
  try {
    localStorage.setItem('shivaputhra_lead_profile', JSON.stringify({
      name: nameVal,
      phone: phoneVal,
      tourType: tourTypeVal,
      subType: subTypeVal,
      pickup: pickupVal,
      date: dateVal,
      travelers: travelersVal,
      purpose: purposeVal,
      notes: notesVal,
      submittedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('LocalStorage save skipped:', e);
  }

  // Show success card in modal
  const formElem = document.getElementById('mandatory-enquiry-form');
  const successElem = document.getElementById('mandatory-success-state');
  const headerElem = document.querySelector('.mandatory-modal-header');
  const trustRow = document.querySelector('.mandatory-trust-row');
  const userNameElem = document.getElementById('success-user-name');

  if (userNameElem) userNameElem.textContent = nameVal;
  if (formElem) formElem.style.display = 'none';
  if (headerElem) headerElem.style.display = 'none';
  if (trustRow) trustRow.style.display = 'none';
  if (successElem) successElem.style.display = 'block';

  // Open WhatsApp in new window and smoothly close modal to unlock website
  setTimeout(() => {
    sendToWhatsApp(whatsappMessage);
    
    // Close modal
    const overlay = document.getElementById('mandatory-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }, 1400);
}

// Auto-slide Happy Clients Customer Photos Carousel (2-Second Slide Interval)
const happySlideIndices = {
  'temple-clients-slider': 0,
  'holiday-clients-slider': 0
};
const happySlideTimers = {};

function goToHappySlide(sliderId, index) {
  const container = document.getElementById(sliderId);
  if (!container) return;

  const slides = container.querySelectorAll('.happy-slide');
  const dots = container.querySelectorAll('.happy-dot');
  if (slides.length === 0) return;

  let targetIndex = index;
  if (targetIndex >= slides.length) targetIndex = 0;
  if (targetIndex < 0) targetIndex = slides.length - 1;

  happySlideIndices[sliderId] = targetIndex;

  slides.forEach((slide, idx) => {
    if (idx === targetIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === targetIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  resetHappyProgress(container);
}

function manualHappySlide(sliderId, direction) {
  const currentIndex = happySlideIndices[sliderId] || 0;
  goToHappySlide(sliderId, currentIndex + direction);
  resetHappyAutoTimer(sliderId);
}

function resetHappyProgress(container) {
  const progressBar = container.querySelector('.happy-timer-progress');
  if (!progressBar) return;
  
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  
  setTimeout(() => {
    progressBar.style.transition = 'width 2s linear';
    progressBar.style.width = '100%';
  }, 20);
}

function resetHappyAutoTimer(sliderId) {
  if (happySlideTimers[sliderId]) {
    clearInterval(happySlideTimers[sliderId]);
  }
  happySlideTimers[sliderId] = setInterval(() => {
    const currentIndex = happySlideIndices[sliderId] || 0;
    goToHappySlide(sliderId, currentIndex + 1);
  }, 2000);
}

function startHappyClientsAutoSlide() {
  const sliders = ['temple-clients-slider', 'holiday-clients-slider'];
  sliders.forEach(sliderId => {
    const container = document.getElementById(sliderId);
    if (container) {
      goToHappySlide(sliderId, 0);
      resetHappyAutoTimer(sliderId);
    }
  });
}

// Auto-initialize when page DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMandatoryEntryModal();
    startCorpClientAutoSlide();
    startHappyClientsAutoSlide();
  });
} else {
  initMandatoryEntryModal();
  startCorpClientAutoSlide();
  startHappyClientsAutoSlide();
}

// Auto-slide corporate client cards on mobile screens
let corpSlideTimer = null;
let currentCorpSlide = 0;

function startCorpClientAutoSlide() {
  if (corpSlideTimer) clearInterval(corpSlideTimer);
  
  corpSlideTimer = setInterval(() => {
    const slider = document.getElementById('corp-clients-slider');
    if (slider && window.innerWidth <= 768) {
      const cards = slider.querySelectorAll('.corp-client-card');
      if (cards.length > 0) {
        currentCorpSlide = (currentCorpSlide + 1) % cards.length;
        const targetCard = cards[currentCorpSlide];
        
        if (currentCorpSlide === 0) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollTo({
            left: targetCard.offsetLeft - 16,
            behavior: 'smooth'
          });
        }
      }
    }
  }, 2500);
}
