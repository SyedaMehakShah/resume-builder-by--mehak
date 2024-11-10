// Type Definitions for Nullable Elements
type HTMLImageElementOrNull = HTMLImageElement | null;
type HTMLButtonElementOrNull = HTMLButtonElement | null;
type HTMLInputElementOrNull = HTMLInputElement | null;
type HTMLAnchorElementOrNull = HTMLAnchorElement | null;
type HTMLElementOrNull = HTMLElement | null;
type HTMLTextAreaElementOrNull = HTMLTextAreaElement | null;

// Image Upload for Photo Preview
(document.getElementById("photo-upload") as HTMLInputElementOrNull)?.addEventListener("change", function (event) {
    const photoPreview = document.getElementById("photo-preview") as HTMLImageElementOrNull;
    const resumePhoto = document.getElementById("resume-photo") as HTMLImageElementOrNull;
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (file && photoPreview && resumePhoto) {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            const result = e.target?.result as string | null;
            if (result) {
                photoPreview.src = result;
                resumePhoto.src = result;
                photoPreview.style.display = "block"; // Ensure photo is visible in preview
            }
        };
        reader.readAsDataURL(file);
    }
});

// Generate Resume
(document.getElementById("generate-button") as HTMLButtonElementOrNull)?.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Hide the form and show the resume template
    const resumeForm = document.getElementById("Resumeform") as HTMLElementOrNull;
    const resumeTemplate = document.getElementById("resume-template") as HTMLElementOrNull;
    if (resumeForm && resumeTemplate) {
        resumeForm.style.display = "none";
        resumeTemplate.style.display = "block";
    }

    // Show edit and download buttons
    const editButton = document.getElementById("edit-button") as HTMLButtonElementOrNull;
    const downloadButton = document.getElementById("download-button") as HTMLButtonElementOrNull;
    if (editButton && downloadButton) {
        editButton.style.display = "inline-block";
        downloadButton.style.display = "inline-block";
    }

    // Personal Information
    const resumeName = document.getElementById("resume-name") as HTMLElementOrNull;
    const name = (document.getElementById("name") as HTMLInputElementOrNull)?.value || '';
    if (resumeName) resumeName.textContent = name;

    const resumeProfession = document.getElementById("resume-profession") as HTMLElementOrNull;
    const profession = (document.getElementById("profession") as HTMLInputElementOrNull)?.value || '';
    if (resumeProfession) resumeProfession.textContent = profession;

    const resumeContact = document.getElementById("resume-contact") as HTMLElementOrNull;
    const contact = (document.getElementById("contact") as HTMLInputElementOrNull)?.value || '';
    if (resumeContact) resumeContact.textContent = contact;

    const resumeEmail = document.getElementById("resume-email") as HTMLElementOrNull;
    const email = (document.getElementById("Gmail") as HTMLInputElementOrNull)?.value || '';
    if (resumeEmail) resumeEmail.textContent = email;

    const resumeCnic = document.getElementById("resume-cnic") as HTMLElementOrNull;
    const cnic = (document.getElementById("CNIC") as HTMLInputElementOrNull)?.value || '';
    if (resumeCnic) resumeCnic.textContent = cnic;

    // Social Links
    const resumeLinkedin = document.getElementById("resume-linkedin") as HTMLAnchorElementOrNull;
    const linkedin = (document.getElementById("linkedin-link") as HTMLInputElementOrNull)?.value || '';
    if (resumeLinkedin) resumeLinkedin.href = linkedin;

    const resumeFacebook = document.getElementById("resume-facebook") as HTMLAnchorElementOrNull;
    const facebook = (document.getElementById("facebook-link") as HTMLInputElementOrNull)?.value || '';
    if (resumeFacebook) resumeFacebook.href = facebook;

    const resumeGithub = document.getElementById("resume-github") as HTMLAnchorElementOrNull;
    const github = (document.getElementById("github-link") as HTMLInputElementOrNull)?.value || '';
    if (resumeGithub) resumeGithub.href = github;

    const resumeInstagram = document.getElementById("resume-instagram") as HTMLAnchorElementOrNull;
    const instagram = (document.getElementById("instagram-link") as HTMLInputElementOrNull)?.value || '';
    if (resumeInstagram) resumeInstagram.href = instagram;

    // About Me
    const resumeAbout = document.getElementById("resume-about") as HTMLElementOrNull;
    const aboutMe = (document.getElementById("about-me") as HTMLTextAreaElementOrNull)?.value || '';
    if (resumeAbout) resumeAbout.textContent = aboutMe;

    // Education
    const resumeEducation = document.getElementById("resume-education") as HTMLElementOrNull;
    const education = (document.getElementById("education") as HTMLInputElementOrNull)?.value || '';
    if (resumeEducation) resumeEducation.textContent = education;

    // Work Experience
    const resumeExperience = document.getElementById("resume-experience") as HTMLElementOrNull;
    const experience = (document.getElementById("experience") as HTMLInputElementOrNull)?.value || '';
    if (resumeExperience) resumeExperience.textContent = experience;

    // Skills
    const skillsList = document.getElementById("resume-skills") as HTMLElementOrNull;
    const skillsItems = document.querySelectorAll("#skills-list li");
    if (skillsList) {
        skillsList.innerHTML = ""; // Clear existing skills in the resume
        skillsItems.forEach(function (skillItem) {
            const resumeSkillItem = document.createElement("li");
            resumeSkillItem.textContent = skillItem.textContent || '';
            skillsList.appendChild(resumeSkillItem);
        });
    }
});

// Add Skill
(document.getElementById("add-skill-button") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    const skillInput = document.getElementById("skill-input") as HTMLInputElementOrNull;
    const skillsList = document.getElementById("skills-list") as HTMLElementOrNull;
    if (skillInput && skillsList && skillInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = skillInput.value;
        skillsList.appendChild(li);
        skillInput.value = ""; // Clear the input after adding
    }
});

// Toggle Education Section
(document.getElementById("toggle-education") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    const educationFieldset = document.getElementById("education-fieldset") as HTMLElementOrNull;
    if (educationFieldset) {
        if (educationFieldset.style.display === "none") {
            educationFieldset.style.display = "block";
            this.textContent = "Hide Education"; // Change the button text
        } else {
            educationFieldset.style.display = "none";
            this.textContent = "Show Education"; // Change the button text
        }
    }
});

// Toggle Skills Section
(document.getElementById("toggle-skills") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    const skillsFieldset = document.getElementById("skills-fieldset") as HTMLElementOrNull;
    if (skillsFieldset) {
        if (skillsFieldset.style.display === "none") {
            skillsFieldset.style.display = "block";
            this.textContent = "Hide Skills"; // Change the button text
        } else {
            skillsFieldset.style.display = "none";
            this.textContent = "Show Skills"; // Change the button text
        }
    }
});

// Toggle Experience Section
(document.getElementById("toggle-experience") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    const experienceFieldset = document.getElementById("experience-fieldset") as HTMLElementOrNull;
    if (experienceFieldset) {
        if (experienceFieldset.style.display === "none") {
            experienceFieldset.style.display = "block";
            this.textContent = "Hide Experience"; // Change the button text
        } else {
            experienceFieldset.style.display = "none";
            this.textContent = "Show Experience"; // Change the button text
        }
    }
});

// Edit Resume
(document.getElementById("edit-button") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    // Hide the resume template and show the form again
    const resumeTemplate = document.getElementById("resume-template") as HTMLElementOrNull;
    const resumeForm = document.getElementById("Resumeform") as HTMLElementOrNull;
    if (resumeTemplate && resumeForm) {
        resumeTemplate.style.display = "none";
        resumeForm.style.display = "block";
    }
});

// Download Resume
(document.getElementById("download-button") as HTMLButtonElementOrNull)?.addEventListener("click", function () {
    const resumeTemplate = document.getElementById("resume-template") as HTMLElementOrNull;
    if (resumeTemplate) {
        html2pdf().from(resumeTemplate).save("Resume.pdf");
    }
});
