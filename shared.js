document.addEventListener('DOMContentLoaded', () => {
    const storySequence = document.getElementById('story-sequence');
    const storyPage = document.getElementById('story-page');
    const nextButton = document.getElementById('next-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');
    // Remove this line
    // const newMessageLink = document.getElementById('new-message-link');

    const images = {
        ear: document.getElementById('ear-image'),
        secret: document.getElementById('secret-image'),
        rizz: document.getElementById('rizz-image'),
        pray: document.getElementById('pray-image'),
        come: document.getElementById('come-image'),
        eyes: document.getElementById('eyes-image'),
        rose: document.getElementById('rose-image')
    };

    let pageIndex = 0;
    
    // Fetch the message from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let message = urlParams.get('message');
    
    // Decode the message (since it was encoded when the link was generated)
    if (message) {
        message = decodeURIComponent(message);
    } else {
        message = "No message found."; // Fallback if no message is in the URL
    }

    const pages = [
        '"I have to tell you something..."',
        '"It is really really important."',
        '"Come closer..."',
        `"${message}"`
    ];

    function showPage(index) {
        storyPage.innerText = pages[index];
        storyPage.className = `message-box page-${index + 1}`;

        Object.values(images).forEach(img => img.style.display = 'none');

        if (index === 0) {
            images.ear.style.display = 'block';
            images.secret.style.display = 'block';
        } else if (index === 1) {
            images.rizz.style.display = 'block';
            images.pray.style.display = 'block';
        } else if (index === 2) {
            images.come.style.display = 'block';
            images.eyes.style.display = 'block';
        } else if (index === pages.length - 1) {
            images.rose.style.display = 'block';
            finalMessage.style.display = 'block';
            storySequence.style.display = 'none';
            // Remove this line
            // newMessageLink.style.display = 'block';
            messageDisplay.textContent = message; // Display the message in the final screen
        }

        nextButton.style.display = index < pages.length - 1 ? 'block' : 'none';

        // Reset animation
        void storyPage.offsetWidth;
        storyPage.style.animation = 'none';
        storyPage.style.animation = null;
    }

    nextButton.addEventListener('click', () => {
        if (pageIndex < pages.length - 1) {
            pageIndex++;
            showPage(pageIndex);
        }
    });

    showPage(0);
});
