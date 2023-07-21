  
  // Kullanıcı adına göre tabloda arama yapma
  function searchByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("name-table");
    tr = table.getElementsByTagName("tr");
  
    // Tüm tablo satırlarını dönerek arama yapma
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; // İkinci sütun İsim sütunu
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
  // Arama alanında herhangi bir değişiklik olduğunda arama yapma
  document.getElementById("search-input").addEventListener("input", searchByName);
  
window.onload = function() {
    const addButton = document.getElementById('add-button');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const saveButton = document.getElementById('save-button');
  
    // Kullanıcıları saklamak için bir dizi oluşturuyoruz
    let users = [];
  
    // Local storage'dan kullanıcıları yükle
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
      renderUsers();
    }
  
    // Modalı açma işlevi
    function openModal() {
      modal.style.display = 'block';
      saveButton.removeEventListener('click', updateUser);
      saveButton.addEventListener('click', saveUser);
    }
  
    // Modalı kapatma işlevi
    function closeModal() {
      modal.style.display = 'none';
    }
  
    // Modalı kaydetme işlevi
    function saveUser() {
      const name = document.getElementById('name-input').value;
      const surname = document.getElementById('surname-input').value;
      const phone = document.getElementById('phone-input').value;
      const reference = document.getElementById('reference-input').value;
      const date = document.getElementById('date-input').value;
      const frame = document.getElementById('frame-input').value;
      const glass = document.getElementById('glass-input').value;
      const details = document.getElementById('details-input').value;
  
      const user = {
        name: name,
        surname: surname,
        phone: phone,
        reference: reference,
        date: date,
        frame: frame,
        glass: glass,
        details: details
      };
  
      users.push(user);
      saveUsersToLocalStorage(); // Kullanıcıları local storage'a kaydet
  
      renderUsers();
  
      closeModal();
  
      // Giriş alanlarını temizle
      document.getElementById('name-input').value = '';
      document.getElementById('surname-input').value = '';
      document.getElementById('phone-input').value = '';
      document.getElementById('reference-input').value = '';
      document.getElementById('date-input').value = '';
      document.getElementById('frame-input').value = '';
      document.getElementById('glass-input').value = '';
      document.getElementById('details-input').value = '';
    }
  
    
    // Kullanıcıları tabloya ekleme işlevi
    function renderUsers() {
      const tableBody = document.querySelector('#name-table tbody');
      tableBody.innerHTML = '';
  
      users.forEach((user, index) => {
        
        
        const newRow = document.createElement('tr');
  
        const numberCell = document.createElement('td');
        numberCell.textContent = index + 1;
  
        const nameCell = document.createElement('td');
        nameCell.textContent = user.name;
  
        const surnameCell = document.createElement('td');
        surnameCell.textContent = user.surname;
  
        const phoneCell = document.createElement('td');
        phoneCell.textContent = user.phone;
  
        const referenceCell = document.createElement('td');
        referenceCell.textContent = user.reference;
  
        const dateCell = document.createElement('td');
        dateCell.textContent = user.date;
  
        const frameCell = document.createElement('td');
        frameCell.textContent = user.frame;
  
        const glassCell = document.createElement('td');
        glassCell.textContent = user.glass;
  
        const detailsCell = document.createElement('td');
        detailsCell.textContent = user.details;
  
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.setAttribute('title', 'Düzenle');
        editButton.addEventListener('click', function() {
          openEditModal(user);
        });
        
        
        
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.setAttribute('title', 'Sil');
        deleteButton.addEventListener('click', function() {
          deleteUser(index);
        });
        
        

        const detailsButton = document.createElement('button');
        detailsButton.innerHTML = '<i class="fas fa-info-circle"></i>';
        detailsButton.setAttribute('title', 'Detay');
        detailsButton.addEventListener('click', function() {
          showUserSales(user);
          openModal();
        });
        
        
        
    
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        actionsCell.appendChild(detailsButton);
  
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
  
        newRow.appendChild(numberCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(surnameCell);
        newRow.appendChild(phoneCell);
        newRow.appendChild(referenceCell);
        newRow.appendChild(dateCell);
        newRow.appendChild(frameCell);
        newRow.appendChild(glassCell);
        newRow.appendChild(detailsCell);
        newRow.appendChild(actionsCell);
  
        tableBody.appendChild(newRow);
      });
    }
  
    // Kullanıcı düzenleme işlevi
    function openEditModal(user) {
      const nameInput = document.getElementById('name-input');
      const surnameInput = document.getElementById('surname-input');
      const phoneInput = document.getElementById('phone-input');
      const referenceInput = document.getElementById('reference-input');
      const dateInput = document.getElementById('date-input');
      const frameInput = document.getElementById('frame-input');
      const glassInput = document.getElementById('glass-input');
      const detailsInput = document.getElementById('details-input');
      const saveButton = document.getElementById('save-button');
  
      nameInput.value = user.name;
      surnameInput.value = user.surname;
      phoneInput.value = user.phone;
      referenceInput.value = user.reference;
      dateInput.value = user.date;
      frameInput.value = user.frame;
      glassInput.value = user.glass;
      detailsInput.value = user.details;
  
      saveButton.textContent = 'Güncelle';
      saveButton.removeEventListener('click', saveUser);
      saveButton.addEventListener('click', function() {
        updateUser(user);
      });
  
      openModal();
    }
  
    // Kullanıcıyı güncelleme işlevi
    function updateUser(user) {
      const name = document.getElementById('name-input').value;
      const surname = document.getElementById('surname-input').value;
      const phone = document.getElementById('phone-input').value;
      const reference = document.getElementById('reference-input').value;
      const date = document.getElementById('date-input').value;
      const frame = document.getElementById('frame-input').value;
      const glass = document.getElementById('glass-input').value;
      const details = document.getElementById('details-input').value;
  
      user.name = name;
      user.surname = surname;
      user.phone = phone;
      user.reference = reference;
      user.date = date;
      user.frame = frame;
      user.glass = glass;
      user.details = details;
  
      saveUsersToLocalStorage(); // Kullanıcıları local storage'a kaydet
  
      renderUsers();
      closeModal();
    }
    
    function showUserDetails(user) {
      // Kullanıcının detaylarını görüntülemek için kullanmak istediğiniz alanları seçin
      var date = user.date;
      var frame = user.frame;
      var glass = user.glass;
      var details = user.details;
    
      // Detayları kullanarak istediğiniz işlemleri gerçekleştirin
      console.log("Satış Tarihi: " + date);
      console.log("Çerçeve: " + frame);
      console.log("Cam: " + glass);
      console.log("Satış Detayları: " + details);
    
      // veya bir modal kullanarak detayları gösterin
      // Detayları modal içerisinde kullanıcıya göstermek için gerekli işlemleri gerçekleştirin
    }
    
  
    // Kullanıcıyı silme işlevi
    function deleteUser(index) {
      users.splice(index, 1);
      saveUsersToLocalStorage(); // Kullanıcıları local storage'a kaydet
  
      renderUsers();
    }
  
    // Kullanıcıları local storage'a kaydetme işlevi
    function saveUsersToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    // Kullanıcı ekleme butonuna tıklama olayını dinleyen işlevi tanımlıyoruz
    addButton.addEventListener('click', openModal);
  
    // Modal kapatma düğmesine tıklama olayını dinleyen işlevi tanımlıyoruz
    closeBtn.addEventListener('click', closeModal);
  
    // Kaydet düğmesine tıklama olayını dinleyen işlevi tanımlıyoruz
    saveButton.addEventListener('click', saveUser);
  };
  
  function urunSat(urunID) {
    var stokID = "stok-" + urunID;
    var stokMiktari = parseInt(document.getElementById(stokID).innerHTML);
    
    if (stokMiktari > 0) {
      stokMiktari--;
      document.getElementById(stokID).innerHTML = stokMiktari;
    } else {
      alert("Bu ürün stokta kalmamıştır.");
    }
  }
  
  var stokListesi = []; // Ürünlerin stok listesi

  document.getElementById("urunEkleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller
  
    var urunAdi = document.getElementById("urunAdiInput").value;
    var barkodNumarasi = document.getElementById("barkodInput").value;
    var stokMiktari = parseInt(document.getElementById("stokMiktariInput").value);
  
    // Ürünleri stok listesine ekleme işlemi
    var yeniUrun = {
      barkod: barkodNumarasi,
      ad: urunAdi,
      stok: stokMiktari
    };
    stokListesi.push(yeniUrun);
  
    // Stok tablosunu güncelleme işlemi
    guncelTabloyuOlustur(stokListesi);
  
    // Formu sıfırla
    document.getElementById("urunAdiInput").value = "";
    document.getElementById("barkodInput").value = "";
    document.getElementById("stokMiktariInput").value = "";
  });
  
  document.getElementById("barkodAraForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller
  
    var barkodNumarasi = document.getElementById("barkodAraInput").value;
  
    // Barkod numarasına göre ürünü arama
    var filtrelenmisUrunler = stokListesi.filter(function(urun) {
      return urun.barkod === barkodNumarasi;
    });
  
    // Arama sonuçlarını tabloda gösterme
    guncelTabloyuOlustur(filtrelenmisUrunler);
  });
  
  function guncelTabloyuOlustur(urunListesi) {
    var tabloHTML = "";
    for (var i = 0; i < urunListesi.length; i++) {
      var urun = urunListesi[i];
      tabloHTML += "<tr>";
      tabloHTML += "<td>" + urun.barkod + "</td>";
      tabloHTML += "<td>" + urun.ad + "</td>";
      tabloHTML += "<td id='stok-" + i + "'>" + urun.stok + "</td>";
      tabloHTML += "<td><button onclick='urunSatis(" + i + ")'>Sat</button></td>";
      tabloHTML += "</tr>";
    }
    document.getElementById("stokTablosu").getElementsByTagName("tbody")[0].innerHTML = tabloHTML;
  }
  
  function urunSatis(urunID) {
    var urun = stokListesi[urunID];
    
    if (urun.stok > 0) {
      urun.stok--;
      document.getElementById("stok-" + urunID).textContent = urun.stok;
    } else {
      alert("Bu ürün stokta kalmamıştır.");
    }
  }
// Get the current date
var currentDate = new Date().toISOString().split('T')[0];

// Create a new input element
var newInput = document.createElement('input');
newInput.setAttribute('type', 'date');
newInput.setAttribute('class', 'input-type-style');
newInput.setAttribute('id', 'new-date-input');
newInput.setAttribute('value', currentDate);

// Replace the original input with the new one
var originalInput = document.getElementById('date-input');
originalInput.parentNode.replaceChild(newInput, originalInput);