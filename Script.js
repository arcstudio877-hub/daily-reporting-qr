const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const statusText = document.getElementById("status");

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" }
}).then(stream => {
  video.srcObject = stream;
});

function capture() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
}

function submitData() {
  if (!canvas.width) {
    alert("Please capture selfie");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const payload = {
      name: document.getElementById("name").value,
      id: document.getElementById("empid").value,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      selfie: canvas.toDataURL("image/jpeg"),
      device: navigator.userAgent
    };

    fetch("PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(() => {
      statusText.innerText = "✅ Report Submitted Successfully";
    })
    .catch(() => {
      statusText.innerText = "❌ Submission Failed";
    });

  }, () => {
    alert("Location permission required");
  });
}
