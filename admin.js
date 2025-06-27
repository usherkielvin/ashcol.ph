const ADMIN_PASSWORD = 'ashcoladmin';
const STORAGE_KEY = 'ashcol_customers';
const TICKET_STORAGE_KEY = 'serviceTickets';

const app = document.getElementById('adminApp');

function renderLogin(error = '') {
  app.innerHTML = `
    <form class="login-form" onsubmit="return false;">
      <h2 style="color:#39B54A;text-align:center;margin-bottom:1.5rem;">Admin Login</h2>
      ${error ? `<div class='error-msg'>${error}</div>` : ''}
      <div style="position:relative;display:flex;align-items:center;">
        <input type="password" id="adminPass" placeholder="Enter admin password" required style="flex:1;padding-right:3rem;" />
        <button type="button" onclick="toggleAdminPassword()" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;color:#666;cursor:pointer;padding:0.25rem;border-radius:4px;transition:color 0.3s ease;" onmouseover="this.style.color='#39B54A'" onmouseout="this.style.color='#666'">
          <i class="fas fa-eye" id="adminPass-icon"></i>
        </button>
      </div>
      <button type="submit">Login</button>
    </form>
  `;
  document.querySelector('.login-form').onsubmit = function() {
    const pass = document.getElementById('adminPass').value;
    if (pass === ADMIN_PASSWORD) {
      localStorage.setItem('ashcol_admin_logged_in', '1');
      renderDashboard();
    } else {
      renderLogin('Incorrect password.');
    }
  };
}

// Password toggle functionality for admin
function toggleAdminPassword() {
  const input = document.getElementById('adminPass');
  const icon = document.getElementById('adminPass-icon');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// Move completed ticket to branch records
function moveTicketToBranch(ticketNumber, branch, notes = '') {
  // Get the ticket from active tickets
  const allTickets = JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY) || '[]');
  const ticket = allTickets.find(t => t.ticketNumber === ticketNumber);
  
  if (!ticket) {
    console.error('Ticket not found:', ticketNumber);
    return false;
  }
  
  // Create branch record
  const branchRecord = {
    branch: branch,
    name: ticket.customerName,
    contact: ticket.contactNumber,
    serviceType: ticket.serviceType,
    ticket: ticket.ticketNumber,
    date: new Date().toISOString().split('T')[0],
    notes: notes
  };
  
  // Add to branch records
  const branchData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  branchData.push(branchRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(branchData));
  
  // Remove from active tickets
  const updatedTickets = allTickets.filter(t => t.ticketNumber !== ticketNumber);
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(updatedTickets));
  
  console.log(`Ticket ${ticketNumber} moved to ${branch} Branch records`);
  return true;
}

function renderDashboard() {
  app.innerHTML = `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Customer Records & Ticket Management</h1>
        <button class="logout-btn">Logout</button>
      </div>
      <div style="display:flex;gap:1rem;margin-bottom:1rem;">
        <button onclick="showTicketQueue()" style="background:#39B54A;color:white;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;">Active Tickets</button>
        <button onclick="showBranchRecords()" style="background:#17a2b8;color:white;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;">Branch Records</button>
      </div>
      <input class="search-bar" id="searchInput" placeholder="Search by name, ticket, or service type..." />
      <div id="contentArea"></div>
    </div>
  `;
  document.querySelector('.logout-btn').onclick = () => {
    localStorage.removeItem('ashcol_admin_logged_in');
    renderLogin();
  };
  document.getElementById('searchInput').oninput = function() {
    if (currentView === 'tickets') {
      showTicketQueue();
    } else {
      showBranchRecords();
    }
  };
  showTicketQueue(); // Default view
}

let currentView = 'tickets';

function showTicketQueue() {
  currentView = 'tickets';
  const allTickets = JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY) || '[]');
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  let filteredTickets = allTickets.filter(ticket => 
    ticket.customerName.toLowerCase().includes(searchTerm) ||
    ticket.ticketNumber.toLowerCase().includes(searchTerm) ||
    ticket.serviceType.toLowerCase().includes(searchTerm)
  );
  
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `
    <h2>Active Service Tickets (${filteredTickets.length})</h2>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;margin-top:1rem;">
        <thead>
          <tr style="background:#39B54A;color:white;">
            <th style="padding:0.75rem;text-align:left;">Ticket #</th>
            <th style="padding:0.75rem;text-align:left;">Customer</th>
            <th style="padding:0.75rem;text-align:left;">Service Type</th>
            <th style="padding:0.75rem;text-align:left;">Status</th>
            <th style="padding:0.75rem;text-align:left;">Date</th>
            <th style="padding:0.75rem;text-align:left;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filteredTickets.length ? filteredTickets.map(ticket => `
            <tr style="border-bottom:1px solid #dee2e6;">
              <td style="padding:0.75rem;">${ticket.ticketNumber}</td>
              <td style="padding:0.75rem;">${ticket.customerName}</td>
              <td style="padding:0.75rem;">${ticket.serviceType}</td>
              <td style="padding:0.75rem;">
                <span style="padding:0.25rem 0.5rem;border-radius:12px;font-size:0.75rem;background:${ticket.status === 'Completed' ? '#d4edda' : ticket.status === 'In Progress' ? '#d1ecf1' : '#fff3cd'};color:${ticket.status === 'Completed' ? '#155724' : ticket.status === 'In Progress' ? '#0c5460' : '#856404'};">
                  ${ticket.status}
                </span>
              </td>
              <td style="padding:0.75rem;">${ticket.preferredDate}</td>
              <td style="padding:0.75rem;">
                ${ticket.status === 'Completed' ? `
                  <button onclick="moveToBranch('${ticket.ticketNumber}')" style="background:#6f42c1;color:white;border:none;padding:0.25rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;margin-right:0.25rem;">
                    <i class="fas fa-building"></i> Move to Branch
                  </button>
                ` : ''}
                <button onclick="deleteTicket('${ticket.ticketNumber}')" style="background:#dc3545;color:white;border:none;padding:0.25rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `).join('') : `<tr><td colspan="6" style="text-align:center;color:#aaa;padding:1rem;">No tickets found.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function showBranchRecords() {
  currentView = 'records';
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const branches = ['Taguig', 'Silang', 'Valenzuela'];
  let html = '';
  
  branches.forEach(branch => {
    const branchData = data.filter(r => r.branch === branch && (
      r.name.toLowerCase().includes(searchTerm) ||
      r.contact.toLowerCase().includes(searchTerm) ||
      r.serviceType.toLowerCase().includes(searchTerm) ||
      r.ticket.toLowerCase().includes(searchTerm)
    ));
    html += `
      <details open style="margin-bottom:2rem;">
        <summary style="font-size:1.2rem;font-weight:600;color:#39B54A;cursor:pointer;">${branch} Branch (${branchData.length})</summary>
        <table class="customer-table" style="margin-top:1rem;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service Type</th>
              <th>Ticket #</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${branchData.length ? branchData.map(r => `
              <tr>
                <td>${r.name}</td>
                <td>${r.contact}</td>
                <td>${r.serviceType}</td>
                <td>${r.ticket}</td>
                <td>${r.date}</td>
                <td>${r.notes || ''}</td>
              </tr>
            `).join('') : `<tr><td colspan="6" style="text-align:center;color:#aaa;">No records found.</td></tr>`}
          </tbody>
        </table>
      </details>
    `;
  });
  
  document.getElementById('contentArea').innerHTML = html;
}

function moveToBranch(ticketNumber) {
  const branch = prompt('Select branch (Taguig/Silang/Valenzuela):');
  if (branch && ['Taguig', 'Silang', 'Valenzuela'].includes(branch)) {
    const notes = prompt('Add completion notes (optional):');
    if (moveTicketToBranch(ticketNumber, branch, notes || '')) {
      alert(`Ticket ${ticketNumber} moved to ${branch} Branch records successfully!`);
      showTicketQueue();
    } else {
      alert('Failed to move ticket to branch records.');
    }
  } else if (branch) {
    alert('Invalid branch. Please select Taguig, Silang, or Valenzuela.');
  }
}

function deleteTicket(ticketNumber) {
  if (confirm(`Are you sure you want to delete ticket ${ticketNumber}?`)) {
    const allTickets = JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY) || '[]');
    const updatedTickets = allTickets.filter(t => t.ticketNumber !== ticketNumber);
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(updatedTickets));
    showTicketQueue();
  }
}

// On load
if (localStorage.getItem('ashcol_admin_logged_in') === '1') {
  renderDashboard();
} else {
  renderLogin();
} 