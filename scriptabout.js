// ----------------------

// 2. Feedback Button Popup
// ----------------------
const rateBtn = document.querySelector(".rate-btn");
rateBtn.addEventListener("click", () => {
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback-popup";
  feedbackBox.innerHTML = `
    <div class="popup-content">
      <h3>We value your feedback 🌸</h3>
      <textarea placeholder="Share your thoughts..." rows="4"></textarea>
      <br>
      <button class="submit-feedback">Submit</button>
      <button class="close-popup">Close</button>
    </div>
  `;
  document.body.appendChild(feedbackBox);

  document.querySelector(".close-popup").onclick = () => feedbackBox.remove();
  document.querySelector(".submit-feedback").onclick = () => {
    alert("Thank you for your feedback! 💙");
    feedbackBox.remove();
  };
});


// 4. Typing Effect for Tagline
// ----------------------
const tagline = document.querySelector(".tagline");
const taglineText = tagline.textContent;
tagline.textContent = "";
let i = 0;
function typeTagline() {
  if (i < taglineText.length) {
    tagline.textContent += taglineText.charAt(i);
    i++;
    setTimeout(typeTagline, 80);
  }
}
window.addEventListener("load", typeTagline);

// ----------------------
// 5. Hover Animation for Features
// ----------------------
const features = document.querySelectorAll(".feature");
features.forEach((feature) => {
  feature.addEventListener("mouseenter", () => {
    feature.style.transform = "scale(1.05)";
    feature.style.transition = "transform 0.3s ease";
    feature.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
  });
  feature.addEventListener("mouseleave", () => {
    feature.style.transform = "scale(1)";
    feature.style.boxShadow = "none";
  });
});
