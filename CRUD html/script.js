
const url = 'http://localhost:8080/students';
let editObj = {};
let students = [];

// Function to fetch all students from the backend API
function fetchStudents() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        students = data
        console.log(JSON.stringify(data));
        // Clear existing student rows
        const studentTableBody = document.getElementById('studentTableBody');
        studentTableBody.innerHTML = '';
  
        // Add each student as a table row
        data.forEach((student) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.studentName}</td>
            <td>${student.email}</td>
            <td>${student.number}</td>
            <td>${student.department}</td>
            <td>
              <button class="edit" onclick="editStudent(${student.studentId})">Edit</button>
              <button class="delete" onclick="deleteStudent(${student.studentId})">Delete</button>
            </td>
          `;
          studentTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
// Function to handle editing of a student
function editStudent(studentId) {

  addTitle.style.display = "none";
  editTitle.style.display = "block";
  hide.style.display = "block";
  
  editObj = students.find(student => student.studentId == studentId);

  document.getElementById("studentId").value = editObj.studentId;
  document.getElementById("studentName").value = editObj.studentName;
  document.getElementById("email").value = editObj.email;
  document.getElementById("number").value = editObj.number;
  document.getElementById("department").value = editObj.department;
}

// Event listener for form submission
document.getElementById('addStudent').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  if (document.getElementById("studentId").value) {
    // Update student
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const department = document.getElementById('department').value;

    const updateStudent = {
      studentName: studentName,
      email: email,
      number: parseInt(number),
      department: department,
    };

    fetch(`${url}/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateStudent),
    })
      .then((response) => response.json())
      .then((data) => {
     
        console.log('Student Updated:', data);

        // Clear form fields
        document.getElementById('studentId').value = '';
        document.getElementById('studentName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('number').value = '';
        document.getElementById('department').value = '';

        // Hide the edit form
        document.getElementById('editTitle').style.display = 'none';
        document.getElementById('hide').style.display = 'none';
        document.getElementById('addTitle').style.display = 'block';

        // Refresh student list
        fetchStudents();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    // Create new student
    const studentName = document.getElementById('studentName').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const department = document.getElementById('department').value;

    const Student = {
      studentName: studentName,
      email: email,
      number: parseInt(number),
      department: department,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Student),
    })
      .then((response) => response.json())
      .then((data) => {
     
        console.log('Student created:', data);

        // Clear form fields
        document.getElementById('studentName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('number').value = '';
        document.getElementById('department').value = '';

        // Refresh student list
        fetchStudents();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

  // Function to handle deletion of a student
  function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this data?')) {
  
      fetch(`${url}/${studentId}`, {
        method: 'DELETE',
      })
        .then((response) => {
       
          console.log('Student deleted:', response);
  
          // Remove the deleted student's row from the table
          const row = document.getElementById(`studentRow_${studentId}`);
          if (row) {
            row.remove();
          }
          fetchStudents();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  } 
// Initial fetch to show  student list
fetchStudents()