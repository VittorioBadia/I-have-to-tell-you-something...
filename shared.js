document.addEventListener('DOMContentLoaded', () => {
    const storySequence = document.getElementById('story-sequence');
    const nextButton = document.getElementById('next-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');

    let pageIndex = 0;
    const pages = document.querySelectorAll('#story-sequence > div');

    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.display = i === index ? 'block' : 'none';
        });
        nextButton.style.display = index < pages.length - 1 ? 'block' : 'none';
    }

    nextButton.addEventListener('click', () => {
        if (pageIndex < pages.length - 1) {
            pageIndex++;
            showPage(pageIndex);
        }
    });

    // Fetch and display the message
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = urlParams.get('id');

    if (messageId) {
        fetch(`/message/${messageId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    messageDisplay.textContent = data.message;
                    showPage(0);
                }
            })
            .catch(error => {
                console.error('Error fetching message:', error);
                messageDisplay.textContent = 'Error loading message.';
            });
    }
});
