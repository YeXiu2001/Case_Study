// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, getDocs, getDoc, setDoc, doc, deleteDoc, onSnapshot,orderBy,updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJuEuDo9UGowUco3f6DqJD3zd_tYisqYU",
  authDomain: "testcase-190aa.firebaseapp.com",
  projectId: "testcase-190aa",
  storageBucket: "testcase-190aa.appspot.com",
  messagingSenderId: "506854141828",
  appId: "1:506854141828:web:25c7af13baaaaa389237d1",
  measurementId: "G-T2TEST4KR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const circlesMap = new Map();
const db = getFirestore(app);
const table = document.getElementById("tableCreports");
// get data from firestore
const reportscol = collection(db, "reports");
const queryDesc = query(reportscol, orderBy("timestamp", "desc"));
const tbody = document.getElementById("tbl_visual");
// for dv.html
function updateCompleteDataTable(querySnapshot) {
    let tableRows = "";
  
    querySnapshot.forEach((queryDoc) => {
      tableRows += `
      <tr data-lat="${queryDoc.data().latitude}" data-lng="${queryDoc.data().longitude}" data-fname="${queryDoc.data().firstname}" data-lname="${queryDoc.data().lastname}" data-eventdesc="${queryDoc.data().description}">
          <td>${queryDoc.data().address}</td>
          <td>${queryDoc.data().event}</td>
          <td>${queryDoc.data().description}</td>
          <td>${queryDoc.data().timestamp}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm edit" id="updateBtn2"><ion-icon name="create-sharp"></ion-icon></button>
            <button type="button" class="btn btn-danger btn-sm delete" id="deleteBtn2" data-id="${queryDoc.id}-delete"><ion-icon name="trash-sharp"></ion-icon></button>
          </td>
        </tr>
        
      `;
      const circle = L.circle([queryDoc.data().latitude, queryDoc.data().longitude],
    {
      color: 'black',
      radius:10,
      fillOpacity:0.4,
      fillColor:'red'
    }).addTo(map);

    circlesMap.set(queryDoc.id, circle); // Store the circle with the document ID as the key
  });
  
    document.getElementById("tbl_Cvisual_complete").innerHTML = tableRows;
  
    // Add event listeners for delete and edit buttons (similar to the previous table)

    const delBtn = document.querySelectorAll('#deleteBtn2');
    delBtn.forEach((button) => {
      button.addEventListener('click', () => {
        const documentId = button.getAttribute('data-id').split('-')[0];
        // Pass the table id as an additional parameter to the deleteDocument function
        deleteDocument(documentId, button, 'tableCreports');
      });
    });

    const updateBtn2 = document.querySelectorAll('#updateBtn2');
    updateBtn2.forEach((button) => {
    button.addEventListener('click', () => {
    // The code for handling the click event will be added here
    const row = button.closest('tr');
    const rowData = row.cells;

    // Retrieve the data from the row
    const address = rowData[0].innerText;
    const event = rowData[1].innerText;
    const timestamp = rowData[2].innerText;
    const documentId = button.nextElementSibling.getAttribute('data-id').split('-')[0];

    // Retrieve the latitude and longitude from the row's data-* attributes
    const latitude = row.getAttribute('data-lat');
    const longitude = row.getAttribute('data-lng');
    const fname = row.getAttribute('data-fname');
    const lname = row.getAttribute('data-lname');
    const desc = row.getAttribute('data-eventdesc');

    // Populate the modal fields with the retrieved data
    document.getElementById('edt_fname').value = fname;
    document.getElementById('edt_lname').value = lname;
    document.getElementById('edt_address').value = address;
    document.getElementById('edt_eventdesc').value = desc;
    document.getElementById('edt_forlat').value = latitude;
    document.getElementById('edt_forlng').value = longitude;

    // Set the selected option in the Event dropdown
    const eventDropdown = document.getElementById('edt_event');
    Array.from(eventDropdown.options).forEach((option) => {
      if (option.value === event) {
        option.selected = true;
      }
    });

    // Store the documentId in a data attribute on the form
    document.getElementById('addDataForm').dataset.id = documentId;

    // Show the modal
    const modalInstance = new bootstrap.Modal(document.getElementById('edit_report_mod'), {});
    modalInstance.show();
  });
});

    if (!$.fn.DataTable.isDataTable('#tableCreports')) {
      $('#tableCreports').DataTable();
    } else {
      $('#tableCreports').DataTable().clear().rows.add($('#tbl_Cvisual_complete').find('tr')).draw();
    }
  }
  // Call onSnapshot with the new updateCompleteDataTable function
  onSnapshot(queryDesc, (querySnapshot) => {
    updateCompleteDataTable(querySnapshot);
  });

  // Function to delete a document from Firestore
const deleteDocument = async (documentId, button, tableId) => {
  const result = await Swal.fire({
    title: "Are you sure you want to delete?",
    text: "You cannot retrieve this file",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, Cancel",
  });

  if (result.isConfirmed) {
    try {
      await deleteDoc(doc(db, "reports", documentId));
      
      // Remove the row from the DataTable
      const table = $(`#${tableId}`).DataTable();
      table.row(button.closest('tr')).remove().draw();
      
      Swal.fire({
        position: 'bottom-end',
        title: "Deleted!",
        text: "The record has been deleted.",
        icon: "success",
      });
      const circle = circlesMap.get(documentId);
      if (circle) {
        circle.remove();
        circlesMap.delete(documentId);
      }

    } catch (error) {
      console.error("Error deleting document: ", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the document",
        icon: "error",
      });
    }
  }
};

// UPDATE FUNCTION
document.getElementById('editBtn').addEventListener('click', async (event) => {
    event.preventDefault();
  
    try {
      const firstname = document.getElementById('edt_fname').value;
      const lastname = document.getElementById('edt_lname').value;
      const event = document.getElementById('edt_event').value;
      const description = document.getElementById('edt_eventdesc').value;
      const latitude = document.getElementById('edt_forlat').value;
      const longitude = document.getElementById('edt_forlng').value;
      const address = document.getElementById('edt_address').value;
      const documentId = document.getElementById('addDataForm').dataset.id;
  
      // Update the document in Firestore
      await updateDoc(doc(db, "reports", documentId), {
        firstname: firstname,
        lastname: lastname,
        event: event,
        description: description,
        latitude: latitude,
        longitude: longitude,
        address: address
      });
  
      // Update the table row in the DOM
      const row = document.querySelector(`button[data-id="${documentId}-delete"]`).closest('tr');
      row.cells[0].innerText = address;
      row.cells[1].innerText = event;
      row.setAttribute('data-lat', latitude);
      row.setAttribute('data-lng', longitude);
      row.setAttribute('data-fname', firstname);
      row.setAttribute('data-lname', lastname);
      row.setAttribute('data-eventdesc', description);
  
      // Hide the modal after the update
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('edit_report_mod'));
      modalInstance.hide();
  
      // Display success alert
      Swal.fire({
        position: 'bottom-end',
        icon: "success",
        title: "Success",
        text: "Report updated successfully"
      });
  
    } catch (error) {
      console.error(error);
    }
  });
  // Define the modalElement variable
  var modalElement = document.querySelector('#report_mod');
  
  // Add an event listener for when the modal is hidden
  modalElement.addEventListener('hidden.bs.modal', function () {
    if (successfulSubmission) {
      if (marker !== null) {
        map.removeLayer(marker);
        marker = null;
      }
      successfulSubmission = false;
      addMarker = false; // disable addMarker
      map.off("click"); // disable marker adding
      resetForm(); // Reset the form fields
    }
  });
  
  