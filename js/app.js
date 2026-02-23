/* SmartBus - Main Application JavaScript */

/* ==========================================================================
   Navigation Toggle (public pages - mobile)
   ========================================================================== */

function toggleNav() {
  var nav = document.getElementById('navbarNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

/* ==========================================================================
   Sidebar Toggle (dashboard pages - mobile)
   ========================================================================== */

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

/* ==========================================================================
   Modal Functions
   ========================================================================== */

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking overlay background
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var modals = document.querySelectorAll('.modal-overlay.active');
    modals.forEach(function (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    });
    document.body.style.overflow = '';
  }
});

/* ==========================================================================
   Tabs
   ========================================================================== */

function initTabs() {
  var tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabGroup = btn.closest('.card') || btn.closest('.dashboard-main') || document;
      var allBtns = btn.parentElement.querySelectorAll('.tab-btn');
      var targetId = btn.getAttribute('data-tab');

      // Deactivate all tabs in this group
      allBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      var allContents = tabGroup.querySelectorAll('.tab-content');
      allContents.forEach(function (c) {
        c.classList.remove('active');
      });

      // Activate selected tab
      btn.classList.add('active');
      var target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   FAQ Accordion (contact page)
   ========================================================================== */

function initAccordion() {
  var accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var item = header.parentElement;
      var isOpen = item.classList.contains('open');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   Form Validation
   ========================================================================== */

function validateForm(formId) {
  var form = document.getElementById(formId);
  if (!form) return false;

  var inputs = form.querySelectorAll('[required]');
  var isValid = true;

  inputs.forEach(function (input) {
    // Remove previous error styling
    input.style.borderColor = '';

    if (!input.value.trim()) {
      input.style.borderColor = '#ea4335';
      isValid = false;
    }

    // Email validation
    if (input.type === 'email' && input.value.trim()) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        input.style.borderColor = '#ea4335';
        isValid = false;
      }
    }
  });

  // Password match check
  var password = form.querySelector('#password');
  var confirmPassword = form.querySelector('#confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.style.borderColor = '#ea4335';
    isValid = false;
  }

  return isValid;
}

/* ==========================================================================
   Search / Filter Tables
   ========================================================================== */

function filterTable(inputId, tableId) {
  var input = document.getElementById(inputId);
  var table = document.getElementById(tableId);

  if (!input || !table) return;

  input.addEventListener('input', function () {
    var query = input.value.toLowerCase();
    var rows = table.querySelectorAll('tbody tr');

    rows.forEach(function (row) {
      var text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

/* ==========================================================================
   Alert Dismiss
   ========================================================================== */

function dismissAlert(element) {
  if (element) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.3s';
    setTimeout(function () {
      element.remove();
    }, 300);
  }
}

/* ==========================================================================
   Login Form Handler
   ========================================================================== */

function handleLogin(event) {
  event.preventDefault();

  var email = document.getElementById('email');
  var password = document.getElementById('password');

  if (!email.value.trim() || !password.value.trim()) {
    showAlert('Please fill in all fields.', 'danger');
    return;
  }

  // Demo: redirect based on email
  if (email.value.includes('admin')) {
    window.location.href = 'admin/dashboard.html';
  } else {
    window.location.href = 'user/dashboard.html';
  }
}

/* ==========================================================================
   Register Form Handler
   ========================================================================== */

function handleRegister(event) {
  event.preventDefault();

  if (!validateForm('registerForm')) {
    showAlert('Please fill in all required fields correctly.', 'danger');
    return;
  }

  // Demo: redirect to login
  window.location.href = 'login.html';
}

/* ==========================================================================
   Show Alert Helper
   ========================================================================== */

function showAlert(message, type) {
  type = type || 'info';

  // Remove existing alerts
  var existingAlerts = document.querySelectorAll('.alert-dynamic');
  existingAlerts.forEach(function (a) { a.remove(); });

  var alert = document.createElement('div');
  alert.className = 'alert alert-' + type + ' alert-dynamic';
  alert.textContent = message;
  alert.style.cursor = 'pointer';
  alert.onclick = function () { dismissAlert(alert); };

  // Insert before the form
  var form = document.querySelector('form');
  if (form) {
    form.parentNode.insertBefore(alert, form);
  }
}

/* ==========================================================================
   Demo Data (no backend)
   ========================================================================== */

function renderTripCards(trips, container) {
  if (!container) return;

  if (!trips.length) {
    container.innerHTML = '<div class="alert alert-info">No trips found for your search.</div>';
    return;
  }

  var html = trips.map(function (trip) {
    var tripKey = [trip.from, trip.to, trip.departure, trip.arrival].join('|');
    return (
      '<div class="ticket-card">' +
        '<div class="ticket-route">' +
          '<div class="route-label">From</div>' +
          '<div class="route-name">' + trip.from + '</div>' +
          '<div class="route-arrow">&#8594;</div>' +
          '<div class="route-label">To</div>' +
          '<div class="route-name">' + trip.to + '</div>' +
        '</div>' +
        '<div class="ticket-details">' +
          '<div class="ticket-detail-item">' +
            '<span class="detail-label">Departure</span>' +
            '<span class="detail-value">' + trip.departure + '</span>' +
          '</div>' +
          '<div class="ticket-detail-item">' +
            '<span class="detail-label">Arrival</span>' +
            '<span class="detail-value">' + trip.arrival + '</span>' +
          '</div>' +
          '<div class="ticket-detail-item">' +
            '<span class="detail-label">Duration</span>' +
            '<span class="detail-value">' + trip.duration + '</span>' +
          '</div>' +
          '<div class="ticket-detail-item">' +
            '<span class="detail-label">Seats Available</span>' +
            '<span class="detail-value">' + trip.seats + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="ticket-price">$' + trip.price.toFixed(2) + '</div>' +
        '<button class="btn btn-primary book-now-btn" data-trip-key="' + tripKey + '" onclick="openBookingModal(' +
          '\'' + trip.from + '\',' +
          '\'' + trip.to + '\',' +
          '\'' + trip.departure + '\',' +
          '\'' + trip.arrival + '\',' +
          '\'' + trip.duration + '\',' +
          trip.price + ', this' +
        ')">Book Now</button>' +
      '</div>'
    );
  }).join('');

  container.innerHTML = html;
  document.dispatchEvent(new Event('tripsRendered'));
}

function initDemoTrips() {
  var tripsContainer = document.getElementById('availableTrips');
  if (!tripsContainer) return;

  var demoTrips = [
    { from: 'Downtown Terminal', to: 'Airport Station', departure: '08:00 AM', arrival: '09:15 AM', duration: '1h 15m', seats: 18, price: 12.5 },
    { from: 'Downtown Terminal', to: 'Airport Station', departure: '10:30 AM', arrival: '11:45 AM', duration: '1h 15m', seats: 22, price: 12.5 },
    { from: 'Downtown Terminal', to: 'Airport Station', departure: '02:00 PM', arrival: '03:10 PM', duration: '1h 10m', seats: 10, price: 11.0 },
    { from: 'Downtown Terminal', to: 'Airport Station', departure: '06:00 PM', arrival: '07:20 PM', duration: '1h 20m', seats: 31, price: 11.0 },
    { from: 'Central Park', to: 'University Campus', departure: '09:00 AM', arrival: '09:35 AM', duration: '35m', seats: 25, price: 8.0 },
    { from: 'Riverside Mall', to: 'Tech Park', departure: '12:15 PM', arrival: '12:55 PM', duration: '40m', seats: 14, price: 10.0 }
  ];

  renderTripCards(demoTrips, tripsContainer);

  var searchTripsForm = document.getElementById('searchTripsForm');
  if (!searchTripsForm) return;

  searchTripsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var from = document.getElementById('fromStop').value;
    var to = document.getElementById('toStop').value;

    var filtered = demoTrips.filter(function (trip) {
      var matchesFrom = !from || trip.from.toLowerCase().indexOf(from.replace('-', ' ')) !== -1;
      var matchesTo = !to || trip.to.toLowerCase().indexOf(to.replace('-', ' ')) !== -1;
      return matchesFrom && matchesTo;
    });

    renderTripCards(filtered, tripsContainer);
  });
}

function initUserRoutesSearch() {
  var input = document.getElementById('userRouteSearch');
  var grid = document.getElementById('userRoutesGrid');
  if (!input || !grid) return;

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();
    var cards = grid.querySelectorAll('.card');

    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.style.display = text.indexOf(query) !== -1 ? '' : 'none';
    });
  });
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */

function handleContact(event) {
  event.preventDefault();

  if (!validateForm('contactForm')) {
    showAlert('Please fill in all required fields.', 'danger');
    return;
  }

  showAlert('Thank you! Your message has been sent successfully.', 'success');
  document.getElementById('contactForm').reset();
}

/* ==========================================================================
   Close sidebar when clicking outside on mobile
   ========================================================================== */

document.addEventListener('click', function (e) {
  var sidebar = document.getElementById('sidebar');
  var toggleBtn = document.querySelector('.sidebar-toggle-btn');

  if (sidebar && sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      toggleBtn && !toggleBtn.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

/* ==========================================================================
   Initialize on DOM Ready
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initTabs();
  initAccordion();
  initDemoTrips();
  initUserRoutesSearch();

  // Form handlers (only bind if form exists on the page)
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContact);
  }

  // Auto-init table filters if elements exist
  filterTable('searchInput', 'dataTable');
  filterTable('routeSearch', 'routesTable');
  filterTable('userSearch', 'usersTable');
  filterTable('busSearch', 'busesTable');
});
