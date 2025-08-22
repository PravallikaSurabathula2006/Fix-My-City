const userForm = document.getElementById("userForm");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

function showToast(message, isError = false) {
  toastMessage.textContent = message;
  toast.classList.remove("bg-red-500", "bg-green-500", "hidden");
  toast.classList.add(isError ? "bg-red-500" : "bg-green-500");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}

// Real-time validation
const inputs = {
  fullName: { input: document.getElementById("fullName"), pattern: /^[A-Za-z ]{6,}$/, error: "Name must be at least 6 characters, letters only." },
  ageInput: { input: document.getElementById("ageInput"), pattern: /^(1[6-9]|[2-9][0-9])$/, error: "Age must be 16 or older." },
  phoneNumber: { input: document.getElementById("phoneNumber"), pattern: /^\+?\d{10,}$/, error: "Enter a valid phone number." },
  postalCode: { input: document.getElementById("postalCode"), pattern: /^[0-9]{5,6}$/, error: "Enter a valid postal code." },
  city: { input: document.getElementById("city"), pattern: /^[A-Za-z ]+$/, error: "City must contain only letters." },
};

Object.values(inputs).forEach(({ input, pattern, error }) => {
  input.addEventListener("input", () => {
    const isValid = pattern.test(input.value);
    input.classList.toggle("border-red-500", !isValid);
    input.classList.toggle("border-green-500", isValid);
    input.nextElementSibling.classList.toggle("hidden", isValid);
    if (!isValid) input.nextElementSibling.textContent = error;
  });
});

// Submit handler
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitButton = userForm.querySelector("button[type='submit']");
  const spinner = submitButton.querySelector("svg");
  submitButton.classList.add("opacity-70", "pointer-events-none");
  spinner.classList.remove("hidden");

  let isValid = true;
  Object.values(inputs).forEach(({ input, pattern, error }) => {
    if (!pattern.test(input.value)) {
      isValid = false;
      input.classList.add("border-red-500");
      input.classList.remove("border-green-500");
      input.nextElementSibling.classList.remove("hidden");
      input.nextElementSibling.textContent = error;
    }
  });

  if (!isValid) {
    showToast("Please fix the errors in the form.", true);
    submitButton.classList.remove("opacity-70", "pointer-events-none");
    spinner.classList.add("hidden");
    return;
  }

  // Simulate successful login
  await new Promise(resolve => setTimeout(resolve, 1000));
  showToast("Login successful!");
  submitButton.classList.remove("opacity-70", "pointer-events-none");
  spinner.classList.add("hidden");
  setTimeout(() => window.location.href = "home.html", 1000); // Redirect on success
});

// Ripple effect on button click
const submitButton = userForm.querySelector("button[type='submit']");
submitButton.addEventListener("click", (e) => {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  submitButton.appendChild(ripple);
  const rect = submitButton.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  ripple.classList.add("animate");
  setTimeout(() => ripple.remove(), 600);
});