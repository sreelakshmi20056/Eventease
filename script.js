document.getElementById("fetchEvents").addEventListener("click", async () => {
    const location = document.getElementById("locationInput").value;
    const eventsContainer = document.getElementById("eventsContainer");

    if (!location) {
        eventsContainer.innerHTML = "<p>Please enter a location!</p>";
        return;
    }

    // Example API endpoint (replace with a real one, such as Eventbrite or Ticketmaster)
    const apiUrl = `https://api.example.com/events?location=${encodeURIComponent(location)}`;

    try {
        eventsContainer.innerHTML = "<p>Loading events...</p>";

        // Fetch events
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch events.");

        const events = await response.json();

        // Display events
        if (events.length === 0) {
            eventsContainer.innerHTML = "<p>No events found for this location.</p>";
        } else {
            eventsContainer.innerHTML = events.map(event => `
                <div class="event">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.venue}</p>
                    <p>${event.description}</p>
                </div>
            `).join("");
        }
    } catch (error) {
        console.error(error);
        eventsContainer.innerHTML = "<p>Error fetching events. Please try again later.</p>";
    }
});
