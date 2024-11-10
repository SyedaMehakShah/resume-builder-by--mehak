var _a, _b, _c, _d;
// Get elements from the DOM
var form = document.getElementById("Resumeform");
var nameInput = document.getElementById("name");
var professionInput = document.getElementById("profession");
var contactInput = document.getElementById("contact");
var emailInput = document.getElementById("Gmail");
var cnicInput = document.getElementById("CNIC");
var aboutMeInput = document.getElementById("about-me");
var educationInput = document.getElementById("education");
var skillInput = document.getElementById("skill-input");
var experienceInput = document.getElementById("experience");
var linkedinInput = document.getElementById("linkedin-link");
var facebookInput = document.getElementById("facebook-link");
var githubInput = document.getElementById("github-link");
var instagramInput = document.getElementById("instagram-link");
var photoInput = document.getElementById("photo-upload");
var photoPreview = document.getElementById("photo-preview");
// Elements for resume template
var resumeTemplate = document.getElementById("resume-template");
var resumeName = document.getElementById("resume-name");
var resumeProfession = document.getElementById("resume-profession");
var resumeContact = document.getElementById("resume-contact");
var resumeEmail = document.getElementById("resume-email");
var resumeCnic = document.getElementById("resume-cnic");
var resumeAbout = document.getElementById("resume-about");
var resumeEducation = document.getElementById("resume-education");
var resumeSkillsList = document.getElementById("resume-skills");
var resumeExperience = document.getElementById("resume-experience");
var resumePhoto = document.getElementById("resume-photo");
var editButton = document.getElementById("edit-button");
var downloadButton = document.getElementById("download-button");
var generateButton = document.getElementById("generate-button");
// Variables to store form data
var skills = [];
// Event listener for adding and displaying skills
(_a = document.getElementById("add-skill-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    if (skillInput.value) {
        skills.push(skillInput.value);
        var skillItem = document.createElement("li");
        skillItem.textContent = skillInput.value;
        resumeSkillsList.appendChild(skillItem);
        skillInput.value = "";
    }
});
// Function to collect form data
function collectFormData() {
    return {
        name: nameInput.value,
        profession: professionInput.value,
        contact: contactInput.value,
        email: emailInput.value,
        cnic: cnicInput.value,
        about: aboutMeInput.value,
        education: educationInput.value,
        skills: skills,
        experience: experienceInput.value,
        linkedin: linkedinInput.value,
        facebook: facebookInput.value,
        github: githubInput.value,
        instagram: instagramInput.value,
        photoSrc: photoPreview.src || ""
    };
}
// Function to display collected data on resume template
function generateResume() {
    var data = collectFormData();
    resumeName.textContent = data.name;
    resumeProfession.textContent = data.profession;
    resumeContact.textContent = data.contact;
    resumeEmail.textContent = data.email;
    resumeCnic.textContent = data.cnic;
    resumeAbout.textContent = data.about;
    resumeEducation.textContent = data.education;
    resumeExperience.textContent = data.experience;
    // Update social links
    document.getElementById("resume-linkedin").href = data.linkedin;
    document.getElementById("resume-facebook").href = data.facebook;
    document.getElementById("resume-github").href = data.github;
    document.getElementById("resume-instagram").href = data.instagram;
    // Update photo
    if (data.photoSrc) {
        resumePhoto.src = data.photoSrc;
    }
    // Hide form and display resume template
    form.style.display = "none";
    resumeTemplate.style.display = "block";
    editButton.style.display = "inline";
    downloadButton.style.display = "inline";
}
// Event listener for generating resume
generateButton.addEventListener("click", generateResume);
// Toggle section visibility
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.style.display = section.style.display === "none" ? "block" : "none";
}
// Toggle buttons for education, skills, and experience
(_b = document.getElementById("toggle-education")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return toggleSection("education-fieldset"); });
(_c = document.getElementById("toggle-skills")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return toggleSection("skills-fieldset"); });
(_d = document.getElementById("toggle-experience")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { return toggleSection("experience-fieldset"); });
// Edit functionality to switch back to the form
editButton.addEventListener("click", function () {
    resumeTemplate.style.display = "none";
    form.style.display = "block";
});
// Photo upload preview
photoInput.addEventListener("change", function () {
    var _a;
    var file = (_a = photoInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            photoPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
});
// Ensure the resume template is initially hidden
resumeTemplate.style.display = "none";
// Single download functionality using html2pdf
downloadButton.addEventListener("click", function () {
    // Hide buttons for a cleaner PDF layout
    editButton.style.display = "none";
    downloadButton.style.display = "none";
    try {
        // Set options for the PDF
        var pdfOptions = {
            margin: 0,
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        // Generate and download the PDF
        html2pdf().from(resumeTemplate).set(pdfOptions).save();
    }
    catch (error) {
        console.error("Failed to generate PDF:", error);
    }
    finally {
        // Show buttons again after attempting to generate the PDF
        editButton.style.display = "inline";
        downloadButton.style.display = "inline";
    }
});
