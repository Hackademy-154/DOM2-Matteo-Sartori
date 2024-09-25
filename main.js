let inputName = document.querySelector("#inputName");
let inputPhone = document.querySelector("#inputPhone");
let showContactButton = document.querySelector("#showContactButton");
let wrapper = document.querySelector("#wrapper");
let addButton = document.querySelector("#addButton");
let removeButton = document.querySelector("#removeButton");

let rubrica = {
  // Array Contatti
  contacts: [
    { name: "Matteo", phone: "3450994579" },
    { name: "Marco", phone: "4566649603" },
    { name: "Luca", phone: "2341590659" },
    { name: "Giovanni", phone: "5953883222" },
    { name: "Paolo", phone: "5065328329" },
  ],

  // Show/Hide Contacts
  showHideContacts: function () {
    wrapper.innerHTML = "";
    this.contacts.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("col-12", "cardContatto", "d-flex");
      div.innerHTML = `
          
            <div class="col-9 d-flex justify-content-center align-items-start ms-4 flex-column">
                <h5 class="text-center">Nome: <span>${element.name}</span></h5>
                <h5 class="text-center">Telefono: <span>${element.phone}</span></h5>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <i class="bi bi-trash3-fill fs-2 iconS"></i>
            </div>
          
          `;
      wrapper.appendChild(div);
    });

    let icons = document.querySelectorAll(".iconS");
    icons.forEach((el, i) => {
      el.addEventListener("click", () => {
        let name = this.contacts[i].name;
        this.removeContact(name);
      });
    });
  },

  // Add Contact
  addContact: function (newName, newPhone) {
    this.contacts.push({ name: newName, phone: newPhone });
  },

  // Remove Contact
  removeContact: function (removedName) {
    let lowerCaseName = removedName.toLowerCase();
    let filteredContacts = this.contacts.filter(
      (el) => el.name.toLowerCase() !== lowerCaseName
    );

    if (filteredContacts.length !== this.contacts.length) {
      this.contacts = filteredContacts;
      this.showHideContacts(this.contacts);
      showContactButton.innerText = "Nascondi rubrica";
    } else {
      alert("contatto non esistente");
    }
  },
};

let show = false;

// Show/Hide Event
showContactButton.addEventListener("click", () => {
  if (show == false) {
    rubrica.showHideContacts();
    showContactButton.innerText = "Nascondi Contatti";
    show = true;
  } else {
    wrapper.innerHTML = "";
    showContactButton.innerText = "Mostra Contatti";
    show = false;
  }
});

// Add Contact Event
addButton.addEventListener("click", () => {
  if (inputName.value != "" && inputPhone.value != "") {
    rubrica.addContact(inputName.value, inputPhone.value);
    inputName.value = "";
    inputPhone.value = "";
    rubrica.showHideContacts();
    alert("Contatto Aggiunto!");
  } else {
    inputName.value = "";
    inputPhone.value = "";
    alert("Compila tutti i campi");
  }
});

// Remove Contact Event
removeButton.addEventListener("click", () => {
  if (inputName.value !== "" && inputPhone.value !== "") {
    let originalLength = rubrica.contacts.length;

    rubrica.contacts = rubrica.contacts.filter(
      (contact) =>
        contact.name.toLowerCase() !== inputName.value.toLowerCase() ||
        contact.phone !== inputPhone.value
    );

    if (rubrica.contacts.length < originalLength) {
      rubrica.showHideContacts();
      alert("Contatto rimosso!");
    } else {
      alert("Contatto non trovato.");
    }

    inputName.value = "";
    inputPhone.value = "";
  } else {
    alert("Compila sia il nome che il telefono per rimuovere il contatto.");
  }
});
