const EMPLOYEE_PASSWORD = 'ashcolemployee';
const STORAGE_KEY = 'ashcol_customers';

const app = document.getElementById('employeeApp');

function renderLogin(error = '') {
  app.innerHTML = `
    <form class="login-form" onsubmit="return false;">
      <h2 style="color:#39B54A;text-align:center;margin-bottom:1.5rem;">Employee Login</h2>
      ${error ? `<div class='error-msg'>${error}</div>` : ''}
      <div style="position:relative;display:flex;align-items:center;">
        <input type="password" id="employeePass" placeholder="Enter employee password" required style="flex:1;padding-right:3rem;" />
        <button type="button" onclick="toggleEmployeePassword()" style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:none;border:none;color:#666;cursor:pointer;padding:0.25rem;border-radius:4px;transition:color 0.3s ease;display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;" onmouseover="this.style.color='#39B54A'" onmouseout="this.style.color='#666'">
          <i class="fas fa-eye" id="employeePass-icon"></i>
        </button>
      </div>
      <button type="submit">Login</button>
    </form>
  `;
  document.querySelector('.login-form').onsubmit = function() {
    const pass = document.getElementById('employeePass').value;
    if (pass === EMPLOYEE_PASSWORD) {
      localStorage.setItem('ashcol_employee_logged_in', '1');
      renderForm();
    } else {
      renderLogin('Incorrect password.');
    }
  };
}

// Password toggle functionality for employee
function toggleEmployeePassword() {
  const input = document.getElementById('employeePass');
  const icon = document.getElementById('employeePass-icon');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function renderForm() {
  app.innerHTML = `
    <div class="employee-container">
      <h2 style="color:#39B54A;text-align:center;margin-bottom:1.5rem;">Customer Submission</h2>
      <form id="employeeCustomerForm" autocomplete="off">
        <div class="form-group">
          <label for="branch">Branch</label>
          <select id="branch" name="branch" required>
            <option value="">Select Branch</option>
            <option value="Taguig">Taguig Branch</option>
            <option value="Silang">Silang Branch</option>
            <option value="Valenzuela">Valenzuela Branch</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" id="custName" name="custName" placeholder="Customer Name" required>
        </div>
        <div class="form-group">
          <input type="text" id="custContact" name="custContact" placeholder="Contact (Phone/Email)" required>
        </div>
        <div class="form-group">
          <select id="custServiceType" name="custServiceType" required>
            <option value="">Select Service Type</option>
            <option value="Installation">Installation</option>
            <option value="Repair">Repair</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Emergency">Emergency Service</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" id="custTicket" name="custTicket" placeholder="Ticket Number (auto or manual)" required>
        </div>
        <div class="form-group">
          <input type="date" id="custDate" name="custDate" required>
        </div>
        <div class="form-group">
          <textarea id="custNotes" name="custNotes" placeholder="Additional Notes" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit Customer</button>
      </form>
      <button class="logout-btn" style="margin-top:2rem;">Logout</button>
    </div>
  `;
  document.querySelector('.logout-btn').onclick = () => {
    localStorage.removeItem('ashcol_employee_logged_in');
    renderLogin();
  };
  document.getElementById('employeeCustomerForm').onsubmit = function(e) {
    e.preventDefault();
    const branch = document.getElementById('branch').value;
    const name = document.getElementById('custName').value.trim();
    const contact = document.getElementById('custContact').value.trim();
    const serviceType = document.getElementById('custServiceType').value;
    let ticket = document.getElementById('custTicket').value.trim();
    const date = document.getElementById('custDate').value;
    const notes = document.getElementById('custNotes').value.trim();
    if (!branch || !name || !contact || !serviceType || !date) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!ticket) {
      ticket = 'TKT-' + Date.now();
    }
    const record = { branch, name, contact, serviceType, ticket, date, notes };
    const key = 'ashcol_customers';
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    data.push(record);
    localStorage.setItem(key, JSON.stringify(data));
    alert('Customer record submitted!');
    document.getElementById('employeeCustomerForm').reset();
  };
}

if (localStorage.getItem('ashcol_employee_logged_in') === '1') {
  renderForm();
} else {
  renderLogin();
} 