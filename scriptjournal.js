document.addEventListener("DOMContentLoaded", () => {
    const addText = document.querySelector(".addText");
    const saveBtn = document.querySelector(".save");
    const journalList = document.getElementById("journalList");

    // Load saved journals from localStorage
    let journals = JSON.parse(localStorage.getItem("journals")) || [];
    renderJournals();

    // Save button click event
    saveBtn.addEventListener("click", () => {
        const text = addText.value.trim();
        if (text === "") {
            showToast("⚠ Please write something first!");
            return;
        }

        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const entry = {
            id: Date.now(),
            content: text,
            date: `${formattedDate} | ${time}`
        };

        journals.push(entry);
        localStorage.setItem("journals", JSON.stringify(journals));

        addText.value = "";
        renderJournals();
        showToast("✅ Journal Saved!");
    });

    // Render journal entries
    function renderJournals() {
        journalList.innerHTML = "";
        journals.forEach(entry => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="journal-entry">
                    <p><strong>${entry.date}</strong></p>
                    <p>${entry.content}</p>
                    <button class="delete-btn">❌</button>
                </div>
            `;
            li.querySelector(".delete-btn").addEventListener("click", () => {
                journals = journals.filter(j => j.id !== entry.id);
                localStorage.setItem("journals", JSON.stringify(journals));
                renderJournals();
                showToast("🗑 Entry Deleted");
            });
            journalList.appendChild(li);
        });
    }

    // Toast Notification
    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 2000);
    }
});
