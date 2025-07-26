const addNoteBtn = document.getElementById("addNoteBtn");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const colorSelect = document.getElementById("colorSelect");
const searchInput = document.getElementById("search");
const darkModeBtn = document.getElementById("darkModeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.style.background = note.color;
        noteDiv.innerHTML = `
            <div class="actions">
                <button onclick="pinNote(${index})">📌</button>
                <button onclick="editNote(${index})">✏</button>
                <button onclick="deleteNote(${index})">❌</button>
            </div>
            <p>${note.text}</p>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

addNoteBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (text === "") return alert("Please write a note!");
    const color = colorSelect.value;
    notes.push({ text, color, pinned: false });
    saveNotes();
    noteInput.value = "";
});

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
}

function editNote(index) {
    const newText = prompt("Edit your note:", notes[index].text);
    if (newText !== null) {
        notes[index].text = newText;
        saveNotes();
    }
}

function pinNote(index) {
    notes[index].pinned = !notes[index].pinned;
    notes.sort((a, b) => b.pinned - a.pinned);
    saveNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".note").forEach((noteDiv, i) => {
        const text = notes[i].text.toLowerCase();
        noteDiv.style.display = text.includes(query) ? "block" : "none";
    });
});

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

downloadBtn.addEventListener("click", () => {
    const allText = notes.map(n => `- ${n.text}`).join("\n");
    const blob = new Blob([allText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_notes.txt";
    a.click();
});

displayNotes();
