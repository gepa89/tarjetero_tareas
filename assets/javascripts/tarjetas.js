// Archivo: assets/javascripts/tarjetas.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('previous_month').addEventListener('click', function() {
      adjustMonth(-1);
    });
  
    document.getElementById('next_month').addEventListener('click', function() {
      adjustMonth(1);
    });
  
    function adjustMonth(monthAdjustment) {
      var startDateField = document.getElementById('start_date');
      var endDateField = document.getElementById('end_date');
      var startDate = new Date(startDateField.value);
      var endDate = new Date(endDateField.value);
  
      startDate.setMonth(startDate.getMonth() + monthAdjustment);
      endDate.setDate(1);
      endDate.setMonth(endDate.getMonth() + monthAdjustment + 1);
      endDate.setDate(endDate.getDate() - 1);
  
      startDateField.value = formatDate(startDate);
      endDateField.value = formatDate(endDate);
  
      document.getElementById('filter-form').submit();
    }
  
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    }
  });
  