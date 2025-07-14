let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function displayContacts() {
  const list = document.getElementById('contactList');
  list.innerHTML = '';
  contacts.forEach((contact, index) => {
    list.innerHTML += `
      <div class="contact">
        <p><strong>${contact.firstName} ${contact.lastName}</strong></p>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.phone}</p>
        <p>Address: ${contact.address}</p>
        <button onclick="editContact(${index})">Edit</button>
        <button onclick="deleteContact(${index})">Delete</button>
      </div>
    `;
  });
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

 const contact = {
  firstName: document.getElementById('firstName').value.trim(),
  lastName: document.getElementById('lastName').value.trim(),
  address: document.getElementById('address').value.trim(),
  email: document.getElementById('email').value.trim(),
  phone: document.getElementById('phone').value.trim(),
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
if (!emailRegex.test(contact.email)) {
  alert("❌ Please enter a valid email address (e.g., name@example.com).");
  return;
}
const phoneRegex = /^\d{10}$/;
if (!phoneRegex.test(contact.phone)) {
  alert("❌ Please enter a valid 10-digit phone number (digits only).");
  return;
}

if (contacts.some(c => c.email === contact.email)) {
  alert("⚠️ Email already exists!");
  return;
}

contacts.push(contact);
localStorage.setItem('contacts', JSON.stringify(contacts));
displayContacts();
this.reset();
});

function deleteContact(index) {
  if (confirm("Are you sure you want to delete?")) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
  }
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById('firstName').value = contact.firstName;
  document.getElementById('lastName').value = contact.lastName;
  document.getElementById('address').value = contact.address;
  document.getElementById('email').value = contact.email;
  document.getElementById('phone').value = contact.phone;

  
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

displayContacts();