
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("profileForm");
    const profileDisplay = document.getElementById("profileDisplay");
    const nameInput = document.getElementById("nameinput1");
    const emailInput = document.getElementById("nameinput2");
    const usernameInput = document.getElementById("nameinput3");
    const genderSelect = document.getElementById("gender");
    const dobInput = document.getElementById("dob");
    const profilePicInput = document.getElementById("profilePic");
    const displayPic = document.getElementById("displayPic");
    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const displayUsername = document.getElementById("displayUsername");
    const displayGender = document.getElementById("displayGender");
    const displayDob = document.getElementById("displayDob");
    const editBtn = document.getElementById("editProfile");

    // Check if profile exists in Local Storage
    if (localStorage.getItem("profileData")) {
        showProfile();
    }

    // Form Submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validation
        if (!nameInput.value || !emailInput.value || !usernameInput.value || !genderSelect.value || !dobInput.value) {
            alert("Please fill out all fields!");
            return;
        }

        // Convert image to Base64
        const file = profilePicInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                saveProfile(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            saveProfile(""); // No image uploaded
        }
    });

    function saveProfile(img) {
        const profileData = {
            name: nameInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            gender: genderSelect.value,
            dob: dobInput.value,
            image: img
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        showProfile();
    }

    function showProfile() {
        const data = JSON.parse(localStorage.getItem("profileData"));
        form.style.display = "none";
        profileDisplay.style.display = "block";

        displayPic.src = data.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        displayName.textContent = `Name: ${data.name}`;
        displayEmail.textContent = `Email: ${data.email}`;
        displayUsername.textContent = `Username: ${data.username}`;
        displayGender.textContent = `Gender: ${data.gender}`;
        displayDob.textContent = `DOB: ${data.dob}`;
    }

    // Edit Profile
    editBtn.addEventListener("click", function () {
        profileDisplay.style.display = "none";
        form.style.display = "block";

        const data = JSON.parse(localStorage.getItem("profileData"));
        nameInput.value = data.name;
        emailInput.value = data.email;
        usernameInput.value = data.username;
        genderSelect.value = data.gender;
        dobInput.value = data.dob;
    });
});const deleteBtn = document.getElementById("deleteProfile");

// Delete Profile
deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete your profile?")) {
        localStorage.removeItem("profileData");
        profileDisplay.style.display = "none";
        form.style.display = "block";

        // Clear form fields
        form.reset();
        alert("Profile deleted successfully!");
    }
});

