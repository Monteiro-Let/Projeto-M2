
document.addEventListener('DOMContentLoaded', function () {

  const data = [
      ['Theodora', 'Koening', '01/08/2024', '12:00'],

  ];

  function listRegistrations() {
      const registrationsContainer = document.querySelector('.registrations');
      registrationsContainer.innerHTML = ''; 

      for (const item of data) {
          const ul = document.createElement('ul');
          for (let i = 0; i < 4; i++) {
              const li = document.createElement('li');
              li.textContent = item[i];
              ul.appendChild(li);
          }

          const deleteIcon = document.createElement('span');
          deleteIcon.classList.add('bi', 'bi-trash-fill', 'delete');
          deleteIcon.addEventListener('click', deleteRegistration);

          const editIcon = document.createElement('span');
          editIcon.classList.add('bi', 'bi-pencil-square', 'edit');
          editIcon.addEventListener('click', editRegistration);

          const deleteLi = document.createElement('li');
          deleteLi.appendChild(deleteIcon);

          const editLi = document.createElement('li');
          editLi.appendChild(editIcon);

          ul.appendChild(deleteLi);
          ul.appendChild(editLi);

          registrationsContainer.appendChild(ul);
      }
  }

  function deleteRegistration(event) {
      const liToDelete = event.target.closest('ul');
      const indexToDelete = Array.from(liToDelete.parentNode.children).indexOf(liToDelete);

      data.splice(indexToDelete, 1);
      listRegistrations();
  }

  function editRegistration(event) {
      const liToEdit = event.target.closest('ul');
      const indexToEdit = Array.from(liToEdit.parentNode.children).indexOf(liToEdit);

      const form = document.querySelector('form');
      const formInputs = form.querySelectorAll('input');
      formInputs[0].value = data[indexToEdit][0];
      formInputs[1].value = data[indexToEdit][1];
      formInputs[2].value = data[indexToEdit][3];
      formInputs[3].value = data[indexToEdit][4];


      const submitButton = form.querySelector('button');
      submitButton.setAttribute('data-edit-index', indexToEdit);


      document.querySelector('.container-form').classList.add('mostrar');
      document.querySelector('.container-table').classList.remove('mostrar');
  }

  function includeRegistration() {
      const form = document.querySelector('form');
      const formInputs = form.querySelectorAll('input');

      const newData = [];
      formInputs.forEach(input => newData.push(input.value));

      const submitButton = form.querySelector('button');
      const editIndex = submitButton.getAttribute('data-edit-index');

      if (editIndex !== null) {
        
          data[editIndex] = newData;
          submitButton.removeAttribute('data-edit-index');
      } else {
        
          data.push(newData);
      }

      listRegistrations();
      form.reset();

    
      document.querySelector('.container-form').classList.remove('mostrar');
      document.querySelector('.container-table').classList.add('mostrar');
  }


  document.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault(); 
      includeRegistration();
  });


  document.querySelector('.include').addEventListener('click', function () {
    
      document.querySelector('.container-form').classList.add('mostrar');
      document.querySelector('.container-table').classList.remove('mostrar');
  });


  listRegistrations();
});