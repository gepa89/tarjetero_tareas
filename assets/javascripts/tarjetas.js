document.addEventListener('DOMContentLoaded', function() {
    // ----------- Manejo de Navegación de Meses ----------- //
    const previousMonthBtn = document.getElementById('previous_month');
    const nextMonthBtn = document.getElementById('next_month');
    const startDateField = document.getElementById('start_date');
    const endDateField = document.getElementById('end_date');
  
    if (previousMonthBtn && nextMonthBtn) {
      previousMonthBtn.addEventListener('click', () => adjustMonth(-1));
      nextMonthBtn.addEventListener('click', () => adjustMonth(1));
    }
  
    function adjustMonth(monthAdjustment) {
      const startDate = new Date(startDateField.value || new Date());
      const endDate = new Date(endDateField.value || new Date());
  
      startDate.setMonth(startDate.getMonth() + monthAdjustment);
      endDate.setDate(1);
      endDate.setMonth(endDate.getMonth() + monthAdjustment + 1);
      endDate.setDate(endDate.getDate() - 1);
  
      startDateField.value = formatDate(startDate);
      endDateField.value = formatDate(endDate);
      document.getElementById('filter-form').submit(); // Enviar el formulario automáticamente
    }
  
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    // ----------- Funcionalidad de Drag & Drop ----------- //
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');
  
    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.issueId);
      });
    });
  
    columns.forEach(column => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
  
      column.addEventListener('drop', (e) => {
        e.preventDefault();
        const issueId = e.dataTransfer.getData('text/plain');
        const card = document.querySelector(`[data-issue-id='${issueId}']`);
        const newStatusId = column.dataset.statusId;
  
        if (card && newStatusId) {
          column.appendChild(card);
  
          // Actualiza el estado de la tarea al moverla a otra columna
          updateIssueStatus(issueId, newStatusId);
        }
      });
    });
  
    function updateIssueStatus(issueId, statusId) {
      fetch('/tarjetas/update_status', { // Asegúrate de que esta ruta esté bien configurada en Rails
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ issue_id: issueId, status_id: statusId })
      })
      .then(response => {
        if (response.ok) {
          console.log(`Tarea ${issueId} actualizada al estado ${statusId}`);
        } else {
          console.error('Error al actualizar el estado de la tarea.');
        }
      })
      .catch(error => console.error('Error en la solicitud:', error));
    }
  });
  