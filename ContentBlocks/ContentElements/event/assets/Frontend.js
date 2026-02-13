/* Frontend/editor JS for event block: 12 month items with 3-item sliding window */
(function () {
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', function () {
    // find containers by locating month controls and using their closest section 
    var controlElements = document.querySelectorAll('.js-month-item, .js-month-prev, .js-month-next');
    var containers = [];
    controlElements.forEach(function (el) {
      var sec = el.closest('section') || el.parentElement;
      if (sec && containers.indexOf(sec) === -1) containers.push(sec);
    });
    for (var ci = 0; ci < containers.length; ci++) {
      (function (container) {
        var monthPrev = container.querySelector('.js-month-prev');
        var monthNext = container.querySelector('.js-month-next');
        var monthItems = Array.prototype.slice.call(container.querySelectorAll('.js-month-item'));
        var eventCards = Array.prototype.slice.call(container.querySelectorAll('.event-card'));
        var categoryFilter = container.querySelector('.js-event-category-filter');
        var filterMonthEl = container.querySelector('.months-of-year') || container.querySelector('.select-month');
        var onlyWithEvents = false; // removed option; always show months
        var defaultFiltered = filterMonthEl && (filterMonthEl.dataset.defaultFiltered === '1' || filterMonthEl.dataset.defaultFiltered === 'true');

        var monthsWithEvents = {};
        for (var ei = 0; ei < eventCards.length; ei++) {
          var d = eventCards[ei].getAttribute('data-date-from');
          if (!d) continue;
          // parse ISO date part to avoid timezone shifts
          var iso = (d.split('T')[0] || '').trim();
          var parts = iso.split('-');
          if (parts.length < 3) continue;
          var mm = parts[1];
          if (!mm) continue;
          monthsWithEvents[mm] = (monthsWithEvents[mm] || 0) + 1;
        }

        var months = monthItems.map(function (it) { return it.dataset.month; });
        if (!months || months.length === 0) {
          // fallback: generate numeric months
          months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        }
        // displayed months count (how many month items are visible). Can be set via data-displayed-months on .months-of-year
        var monthsOfYearEl = container.querySelector('.months-of-year');
        var displayedMonths = 3;
        if (monthsOfYearEl) {
          var dmAttr = monthsOfYearEl.getAttribute('data-displayed-months') || monthsOfYearEl.dataset.displayedMonths;
          var dm = parseInt(dmAttr, 10);
          if (!isNaN(dm) && dm > 0) displayedMonths = dm;
        }
        // displayed months count (how many month items are visible). Can be set via data-displayed-months on .months-of-year
        var monthsOfYearEl = container.querySelector('.months-of-year');
        var displayedMonths = 3;
        if (monthsOfYearEl) {
          var dmAttr = monthsOfYearEl.getAttribute('data-displayed-months') || monthsOfYearEl.dataset.displayedMonths;
          var dm = parseInt(dmAttr, 10);
          if (!isNaN(dm) && dm > 0) displayedMonths = dm;
        }
        var nowIdx = new Date().getMonth();
        // compute startIndex so that the center of the visible window is the current month
        var h = Math.floor(displayedMonths / 2);
        var startIndex = (nowIdx - h + 12) % 12; // center will be (startIndex + h) => nowIdx
        // state
        var selectedMonth = null; // '01'..'12'
        var selectedDay = null; // '01'..'31'
        var selectedCategory = null;
        var searchTerm = '';
        var searchInput = container.querySelector('.js-event-search');
        var dayButtons = Array.prototype.slice.call(container.querySelectorAll('.day'));
        // displayed months count (how many month items are visible). Can be set via data-displayed-months on .months-of-year
        var monthsOfYearEl = container.querySelector('.months-of-year');
        var displayedMonths = 3;
        if (monthsOfYearEl) {
          var dmAttr = monthsOfYearEl.getAttribute('data-displayed-months') || monthsOfYearEl.dataset.displayedMonths;
          var dm = parseInt(dmAttr, 10);
          if (!isNaN(dm) && dm > 0) displayedMonths = dm;
        }
        // always center current month by default (recompute using displayedMonths)
        startIndex = (nowIdx - h + 12) % 12;

        // default selected date: today if user hasn't chosen
        var today = new Date();
        var todayMonth = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : '' + (today.getMonth() + 1);
        var todayDay = (today.getDate() < 10) ? '0' + today.getDate() : '' + today.getDate();
        if (!selectedMonth) selectedMonth = todayMonth;
        if (!selectedDay) selectedDay = todayDay;

        function renderWindow() {
          for (var mi = 0; mi < monthItems.length; mi++) {
            var item = monthItems[mi];
            var relative = (mi - startIndex + 12) % 12;
            var visible = relative < displayedMonths;
            var li = item.parentElement;
            if (visible) li.classList.remove('d-none'); else li.classList.add('d-none');
            if (relative === h) li.classList.add('active'); else li.classList.remove('active');
            if (monthsWithEvents[item.dataset.month]) item.classList.add('has-events'); else item.classList.remove('has-events');
          }
          // center month becomes the visible month for the timeline
          var center = (startIndex + h) % 12;
          if (monthItems[center] && monthItems[center].dataset.month) {
            var visibleMonth = monthItems[center].dataset.month;
            // if defaultFiltered is true, preselect the month and optionally today's day
            if (defaultFiltered) {
              selectedMonth = visibleMonth;
              var today = new Date();
              var dd = today.getDate();
              selectedDay = dd < 10 ? '0' + dd : '' + dd;
            }
            updateDaysForMonth(visibleMonth);
          }
        }

        function updateDaysForMonth(month) {
          // show only days up to daysInMonth; default use current year
          var year = new Date().getFullYear();
          var mInt = parseInt(month, 10);
          var daysInMonth = new Date(year, mInt, 0).getDate();
          dayButtons.forEach(function (btn) {
            var day = parseInt(btn.dataset.day || btn.getAttribute('data-day') || btn.textContent, 10);
            if (!day) return;
            if (day <= daysInMonth) btn.classList.remove('d-none'); else btn.classList.add('d-none');
            // if selectedDay is outside new month, clear it
            if (selectedDay && parseInt(selectedDay,10) > daysInMonth) selectedDay = null;
            var dayStr = (day < 10 ? '0'+day : ''+day);
            btn.classList.toggle('day-selected', selectedDay === dayStr);
            // mark today's button visually if not selected
            var today = new Date();
            var todayStr = (today.getDate() < 10) ? '0'+today.getDate() : ''+today.getDate();
            if (!selectedDay && todayStr === dayStr) {
              btn.classList.add('today');
            } else {
              btn.classList.remove('today');
            }
          });
          applyFilters();
        }

        function findNextWithEvents(fromIdx) {
          for (var j = 1; j <= 12; j++) {
            var cand = (fromIdx + j) % 12;
            if (monthsWithEvents[months[cand]]) return cand;
          }
          return fromIdx;
        }

        function findPrevWithEvents(fromIdx) {
          for (var j = 1; j <= 12; j++) {
            var cand = (fromIdx + 12 - j) % 12;
            if (monthsWithEvents[months[cand]]) return cand;
          }
          return fromIdx;
        }

        function applyFilters() {
          for (var ci2 = 0; ci2 < eventCards.length; ci2++) {
            var card = eventCards[ci2];
            var dFrom = card.getAttribute('data-date-from');
            var dTo = card.getAttribute('data-date-to') || '';
            var visible = true;
            if (dFrom) {
              // extract ISO date portions to avoid timezone conversion differences
              var isoFrom = (dFrom.split('T')[0] || '').trim();
              var partsFrom = isoFrom.split('-');
              var isoTo = (dTo.split('T')[0] || '').trim();
              var partsTo = isoTo.split('-');
              if (partsFrom.length >= 3) {
                // if no valid to-date, treat end as start
                if (partsTo.length < 3) partsTo = partsFrom;
                var eventEndYear = parseInt(partsTo[0], 10);
                var eventEndMonth = parseInt(partsTo[1], 10);
                var eventEndDay = parseInt(partsTo[2], 10);
                var selDay = selectedDay || '01';
                var selYear = new Date().getFullYear();
                var selMonthInt = parseInt(selectedMonth, 10);
                var selDayInt = parseInt(selDay, 10);
                var eventEndUtc = Date.UTC(eventEndYear, eventEndMonth - 1, eventEndDay);
                var selUtc = Date.UTC(selYear, selMonthInt - 1, selDayInt);
                  if (eventEndUtc < selUtc) visible = false;
              }
            }
            // category
            if (visible && selectedCategory && selectedCategory !== 'all') {
              var cats = (card.getAttribute('data-category') || '').split(',');
              if (cats.indexOf(selectedCategory) === -1) visible = false;
            }
            // search
            if (visible && searchTerm && searchTerm.length >= 2) {
              var text = (card.textContent || '').toLowerCase();
              if (text.indexOf(searchTerm.toLowerCase()) === -1) visible = false;
            }
            card.style.display = visible ? '' : 'none';
          }
        }

        renderWindow();

        if (monthPrev) monthPrev.addEventListener('click', function () {
          // single-step left
          var nextIdx = (startIndex + 12 - 1) % 12;
          startIndex = nextIdx;
          renderWindow();
          applyFilters();
        });
        if (monthNext) monthNext.addEventListener('click', function () {
          // single-step right
          var nextIdx = (startIndex + 1) % 12;
          startIndex = nextIdx;
          renderWindow();
          applyFilters();
        });

        for (var ii = 0; ii < monthItems.length; ii++) {
          (function (idx) { monthItems[idx].addEventListener('click', function () { var m = this.dataset.month; if (!m) return; startIndex = (idx - h + 12) % 12; renderWindow(); selectedMonth = m; applyFilters(); }); })(ii);
        }

        // category filter
        if (categoryFilter) categoryFilter.addEventListener('change', function () {
          selectedCategory = this.value || null;
          applyFilters();
        });

        // search input with simple debounce
        var searchTimer = null;
        if (searchInput) {
          searchInput.addEventListener('input', function () {
            var v = (this.value || '').trim();
            if (searchTimer) clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
              searchTerm = v;
              applyFilters();
            }, 250);
          });
        }

        // day buttons
        dayButtons.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var day = btn.dataset.day || btn.getAttribute('data-day') || btn.textContent;
            if (!day) return;
            day = (parseInt(day,10) < 10) ? ('0' + parseInt(day,10)) : ('' + parseInt(day,10));
            if (selectedDay === day) selectedDay = null; else selectedDay = day;
            // toggle day-selected class
            dayButtons.forEach(function (b) { b.classList.remove('day-selected'); });
            if (selectedDay) btn.classList.add('day-selected');
            applyFilters();
          });
        });
      })(containers[ci]);
    }
  });
})();
