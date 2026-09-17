// ==========================================
// APPOINTMENT PAGE JAVASCRIPT
// ==========================================

// Set minimum appointment date to today
const dateInput = document.getElementById("date");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayString = `${year}-${month}-${day}`;
dateInput.min = todayString;

// ==========================================
// DOCTOR INFORMATION
// ==========================================
const doctorSelect = document.getElementById("doctor");
const doctorInfo = document.getElementById("doctorInfo");
const doctorSpecialty = document.getElementById("doctorSpecialty");
const doctorTime = document.getElementById("doctorTime");

doctorSelect.addEventListener("change", function () {
    const selectedOption = doctorSelect.options[doctorSelect.selectedIndex];

    if (doctorSelect.value !== "") {
        const specialty = selectedOption.getAttribute("data-specialty");
        const time = selectedOption.getAttribute("data-time");

        doctorSpecialty.textContent = "Specialization: " + specialty;
        doctorTime.textContent = "Available Hours: " + time;
        doctorInfo.style.display = "block";
    } else {
        doctorInfo.style.display = "none";
    }
});

// ==========================================
// APPOINTMENT FORM SUBMIT
// ==========================================
const appointmentForm = document.getElementById("appointmentForm");
const successPopup = document.getElementById("successPopup");
const popupDetails = document.getElementById("popupDetails");
const closePopupBtn = document.getElementById("closePopupBtn");

appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get patient information
    const patientName = document.getElementById("patientName").value;
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Convert date to readable format
    const appointmentDate = new Date(date + "T00:00:00");
    const formattedDate = appointmentDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    // Build the colourful popup details
    popupDetails.innerHTML = `
        <div class="row">
            <span class="label">👤 Patient</span>
            <span class="value">${patientName}</span>
        </div>
        <div class="row">
            <span class="label">👨‍⚕️ Doctor</span>
            <span class="value">${doctor}</span>
        </div>
        <div class="row">
            <span class="label">📅 Date</span>
            <span class="value">${formattedDate}</span>
        </div>
        <div class="row">
            <span class="label">⏰ Time</span>
            <span class="value">${time}</span>
        </div>
    `;

    // Show popup
    successPopup.classList.add("active");

    // Reset form
    appointmentForm.reset();
    doctorInfo.style.display = "none";
});

// ==========================================
// CLOSE POPUP
// ==========================================
closePopupBtn.addEventListener("click", function () {
    successPopup.classList.remove("active");
});

// Close when clicking outside the popup
successPopup.addEventListener("click", function (event) {
    if (event.target === successPopup) {
        successPopup.classList.remove("active");
    }
});