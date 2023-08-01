
  // Function to close the modal
  function closeModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.style.display = 'none';
  }

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('myModal');
  var btn = document.getElementById('myBtn');
  var span = document.getElementsByClassName('close')[0];
  var submitBtn = document.getElementById('submitBtn');
  var editRow = null; // Düzenleme yapılacak satırın referansını tutar

  btn.onclick = function () {
    modal.style.display = 'block';
  }

  span.onclick = function () {
    modal.style.display = 'none';
    resetForm(); // Formu sıfırla
  }

  submitBtn.onclick = function () {
    var firmaKodu = document.getElementById('firmaKodu').value;
    var firmaAdi = document.getElementById('firmaAdi').value;
    var ulke = document.getElementById('ulke').value;
    var alisPara = document.getElementById('alisPara').value;
    var satisPara = document.getElementById('satisPara').value;
    var iskontoOrani = document.getElementById('iskontoOrani').value;
    var satis = document.getElementById('satis').value;
    var fiyat = document.getElementById('fiyat').value;

    if (editRow) {
      // Düzenleme modunda ise, satırı güncelle
      editRow.cells[0].innerHTML = firmaKodu;
      editRow.cells[1].innerHTML = firmaAdi;
      editRow.cells[2].innerHTML = ulke;
      editRow.cells[3].innerHTML = alisPara;
      editRow.cells[4].innerHTML = satisPara;
      editRow.cells[5].innerHTML = iskontoOrani;
      editRow.cells[6].innerHTML = satis;
      editRow.cells[7].innerHTML = fiyat;
    } else {
      // Yeni firma ekleniyor
      var table = document.getElementById('firmaTable');
      var newRow = table.insertRow(table.rows.length);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);
      var cell6 = newRow.insertCell(5);
      var cell7 = newRow.insertCell(6);
      var cell8 = newRow.insertCell(7);
      var cell9 = newRow.insertCell(8);
      cell1.innerHTML = firmaKodu;
      cell2.innerHTML = firmaAdi;
      cell3.innerHTML = ulke;
      cell4.innerHTML = alisPara;
      cell5.innerHTML = satisPara;
      cell6.innerHTML = iskontoOrani;
      cell7.innerHTML = satis;
      cell8.innerHTML = fiyat;
      cell9.innerHTML = '<i class="fas fa-edit edit-btn"></i> <i class="fas fa-trash-alt delete-btn"></i>';

      // Verileri localStorage'e kaydet
      saveDataToLocalStorage();
    }

    modal.style.display = 'none';
    resetForm(); // Formu sıfırla
  }

  // Düzenleme işlemi için düzenle butonlarını dinleyin
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('edit-btn')) {
      var row = e.target.parentNode.parentNode;
      var cells = row.getElementsByTagName('td');
      var firmaKodu = cells[0].innerHTML;
      var firmaAdi = cells[1].innerHTML;
      var ulke = cells[2].innerHTML;
      var alisPara = cells[3].innerHTML;
      var satisPara = cells[4].innerHTML;
      var iskontoOrani = cells[5].innerHTML;
      var satis = cells[6].innerHTML;
      var fiyat = cells[7].innerHTML;

      // Formu doldur
      document.getElementById('firmaKodu').value = firmaKodu;
      document.getElementById('firmaAdi').value = firmaAdi;
      document.getElementById('ulke').value = ulke;
      document.getElementById('alisPara').value = alisPara;
      document.getElementById('satisPara').value = satisPara;
      document.getElementById('iskontoOrani').value = iskontoOrani;
      document.getElementById('satis').value = satis;
      document.getElementById('fiyat').value = satis;
      editRow = row; // Düzenleme yapılacak satırın referansını kaydet

      modal.style.display = 'block';
    }
  });

  // Silme işlemi için sil butonlarını dinleyin
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
      var row = e.target.parentNode.parentNode;
      row.parentNode.removeChild(row);

      // Verileri localStorage'den güncelle
      saveDataToLocalStorage();
    }
  });

  // Sayfa yüklendiğinde verileri localStorage'den geri yükle
  loadDataFromLocalStorage();

  // Formu sıfırlamak için işlev
  function resetForm() {
    editRow = null;
    document.getElementById('firmaKodu').value = '';
    document.getElementById('firmaAdi').value = '';
    document.getElementById('ulke').value = '';
    document.getElementById('alisPara').value = '';
    document.getElementById('satisPara').value = '';
    document.getElementById('iskontoOrani').value = '';
    document.getElementById('satis').value = '';
    document.getElementById('fiyat').value = '';
  }

  // Verileri localStorage'e kaydetmek için işlev
  function saveDataToLocalStorage() {
    var tableData = [];
    var tableRows = document.querySelectorAll('#firmaTable tbody tr');

    tableRows.forEach(function (row) {
      var rowData = {
        firmaKodu: row.cells[0].innerHTML,
        firmaAdi: row.cells[1].innerHTML,
        ulke: row.cells[2].innerHTML,
        alisPara: row.cells[3].innerHTML,
        satisPara: row.cells[4].innerHTML,
        iskontoOrani: row.cells[5].innerHTML,
        satis: row.cells[6].innerHTML,
        fiyat: row.cells[7].innerHTML
      };

      tableData.push(rowData);
    });

    localStorage.setItem('firmaTableData', JSON.stringify(tableData));
  }

  // Verileri localStorage'den geri yüklemek için işlev
  function loadDataFromLocalStorage() {
    var tableData = JSON.parse(localStorage.getItem('firmaTableData'));

    if (tableData) {
      var table = document.getElementById('firmaTable');
      var tbody = table.querySelector('tbody');

      tableData.forEach(function (rowData) {
        var newRow = tbody.insertRow();
        newRow.insertCell().innerHTML = rowData.firmaKodu;
        newRow.insertCell().innerHTML = rowData.firmaAdi;
        newRow.insertCell().innerHTML = rowData.ulke;
        newRow.insertCell().innerHTML = rowData.alisPara;
        newRow.insertCell().innerHTML = rowData.satisPara;
        newRow.insertCell().innerHTML = rowData.iskontoOrani;
        newRow.insertCell().innerHTML = rowData.satis;
        newRow.insertCell().innerHTML = rowData.fiyat;
        newRow.insertCell().innerHTML = '<i class="fas fa-edit edit-btn"></i> <i class="fas fa-trash-alt delete-btn"></i>';
      });
    }
  }

});
