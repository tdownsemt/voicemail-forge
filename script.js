function generateNote() {
  const patient = document.getElementById("patient").value.trim();
  const datetime = document.getElementById("datetime").value || new Date().toISOString();
  const appt = document.getElementById("appt").value;
  const newTime = document.getElementById("newTime").value;
  const notes = document.getElementById("notes").value.trim();

  const outcomes = [];
  if (document.getElementById("noAnswer").checked) {
    outcomes.push("No answer.");
  }
  if (document.getElementById("lineBusy").checked) {
    outcomes.push("Line was busy.");
  }
  if (document.getElementById("voicemail").checked) {
    outcomes.push(`Voicemail left regarding the ${appt.toLowerCase()}.`);
  }
  if (document.getElementById("mychart").checked) {
    outcomes.push("Message sent via MyChart.");
  }
  if (document.getElementById("rescheduled").checked && newTime) {
    outcomes.push(`Appointment rescheduled to ${new Date(newTime).toLocaleString()}.`);
  }

  let summary = `Patient${patient ? " " + patient : ""} was called on ${new Date(datetime).toLocaleString()} regarding a ${appt.toLowerCase()}.\n`;
  summary += outcomes.length ? outcomes.join(" ") : "No outcomes selected.";
  if (notes) {
    summary += `\nAdditional notes: ${notes}`;
  }

  document.getElementById("output").textContent = summary;
}

function copyToClipboard() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

function clearForm() {
  document.getElementById("patient").value = "";
  document.getElementById("datetime").value = "";
  document.getElementById("appt").value = "Physical";
  document.getElementById("newTime").value = "";
  document.getElementById("notes").value = "";
  ["noAnswer", "lineBusy", "voicemail", "mychart", "rescheduled"].forEach(id => {
    document.getElementById(id).checked = false;
  });
  document.getElementById("output").textContent = "(Generated encounter note will appear here.)";
}
