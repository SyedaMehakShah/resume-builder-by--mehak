declare var html2pdf: any;

// Interface to define structure for form data
interface ResumeFormData {
  name: string;
  profession: string;
  contact: string;
  email: string;
  cnic: string;
  about: string;
  education: string;
  skills: string[];
  experience: string;
  linkedin: string;
  facebook: string;
  github: string;
  instagram: string;
  photoSrc: string;
}

// Get elements from the DOM
const form = document.getElementById("Resumeform") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const professionInput = document.getElementById("profession") as HTMLInputElement;
const contactInput = document.getElementById("contact") as HTMLInputElement;
const emailInput = document.getElementById("Gmail") as HTMLInputElement;
const cnicInput = document.getElementById("CNIC") as HTMLInputElement;
const aboutMeInput = document.getElementById("about-me") as HTMLTextAreaElement;
const educationInput = document.getElementById("education") as HTMLTextAreaElement;
const skillInput = document.getElementById("skill-input") as HTMLInputElement;
const experienceInput = document.getElementById("experience") as HTMLTextAreaElement;
const linkedinInput = document.getElementById("linkedin-link") as HTMLInputElement;
const facebookInput = document.getElementById("facebook-link") as HTMLInputElement;
const githubInput = document.getElementById("github-link") as HTMLInputElement;
const instagramInput = document.getElementById("instagram-link") as HTMLInputElement;
const photoInput = document.getElementById("photo-upload") as HTMLInputElement;
const photoPreview = document.getElementById("photo-preview") as HTMLImageElement;

// Elements for resume template
const resumeTemplate = document.getElementById("resume-template") as HTMLDivElement;
const resumeName = document.getElementById("resume-name") as HTMLElement;
const resumeProfession = document.getElementById("resume-profession") as HTMLElement;
const resumeContact = document.getElementById("resume-contact") as HTMLElement;
const resumeEmail = document.getElementById("resume-email") as HTMLElement;
const resumeCnic = document.getElementById("resume-cnic") as HTMLElement;
const resumeAbout = document.getElementById("resume-about") as HTMLElement;
const resumeEducation = document.getElementById("resume-education") as HTMLElement;
const resumeSkillsList = document.getElementById("resume-skills") as HTMLUListElement;
const resumeExperience = document.getElementById("resume-experience") as HTMLElement;
const resumePhoto = document.getElementById("resume-photo") as HTMLImageElement;
const editButton = document.getElementById("edit-button") as HTMLButtonElement;
const downloadButton = document.getElementById("download-button") as HTMLButtonElement;
const generateButton = document.getElementById("generate-button") as HTMLButtonElement;

// Variables to store form data
const skills: string[] = [];

// Event listener for adding and displaying skills
document.getElementById("add-skill-button")?.addEventListener("click", () => {
  if (skillInput.value) {
    skills.push(skillInput.value);
    const skillItem = document.createElement("li");
    skillItem.textContent = skillInput.value;
    resumeSkillsList.appendChild(skillItem);
    skillInput.value = "";
  }
});

// Function to collect form data
function collectFormData(): ResumeFormData {
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
function generateResume(): void {
  const data = collectFormData();
  resumeName.textContent = data.name;
  resumeProfession.textContent = data.profession;
  resumeContact.textContent = data.contact;
  resumeEmail.textContent = data.email;
  resumeCnic.textContent = data.cnic;
  resumeAbout.textContent = data.about;
  resumeEducation.textContent = data.education;
  resumeExperience.textContent = data.experience;

  // Update social links
  (document.getElementById("resume-linkedin") as HTMLAnchorElement).href = data.linkedin;
  (document.getElementById("resume-facebook") as HTMLAnchorElement).href = data.facebook;
  (document.getElementById("resume-github") as HTMLAnchorElement).href = data.github;
  (document.getElementById("resume-instagram") as HTMLAnchorElement).href = data.instagram;

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
function toggleSection(sectionId: string): void {
  const section = document.getElementById(sectionId) as HTMLElement;
  section.style.display = section.style.display === "none" ? "block" : "none";
}

// Toggle buttons for education, skills, and experience
document.getElementById("toggle-education")?.addEventListener("click", () => toggleSection("education-fieldset"));
document.getElementById("toggle-skills")?.addEventListener("click", () => toggleSection("skills-fieldset"));
document.getElementById("toggle-experience")?.addEventListener("click", () => toggleSection("experience-fieldset"));

// Edit functionality to switch back to the form
editButton.addEventListener("click", () => {
  resumeTemplate.style.display = "none";
  form.style.display = "block";
});

// Photo upload preview
photoInput.addEventListener("change", () => {
  const file = photoInput.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
});

// Ensure the resume template is initially hidden
resumeTemplate.style.display = "none";

// Single download functionality using html2pdf
downloadButton.addEventListener("click", () => {
  // Hide buttons for a cleaner PDF layout
  editButton.style.display = "none";
  downloadButton.style.display = "none";

  try {
    // Set options for the PDF
    const pdfOptions = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Generate and download the PDF
    html2pdf().from(resumeTemplate).set(pdfOptions).save();
  } catch (error) {
    console.error("Failed to generate PDF:", error);
  } finally {
    // Show buttons again after attempting to generate the PDF
    editButton.style.display = "inline";
    downloadButton.style.display = "inline";
  }
});
