// Fetch Instance ID from API
fetch("/instance-id")
  .then(response => response.json())
  .then(data => {
      document.getElementById("instance-id").textContent = data.instanceId || "Error fetching Instance ID";
  })
  .catch(error => {
      document.getElementById("instance-id").textContent = "Error fetching Instance ID";
  });
