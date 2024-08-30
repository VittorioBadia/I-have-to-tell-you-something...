document.addEventListener('DOMContentLoaded', () => {
    const storySequence = document.getElementById('story-sequence');
    const storyPage = document.getElementById('story-page');
    const nextButton = document.getElementById('next-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');
    const newMessageLink = document.getElementById('new-message-link');

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
    let message = '';

    const pages = [
        '"I have to tell you something..."',
        '"So I was thinking this..."',
        '"It is really really important."',
        '"Come closer..."',
        ''  // This will be replaced with the actual message
    ];

    function showPage(index) {
        storyPage.innerText = pages[index];
        storyPage.className = `page-${index + 1}`;

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
            newMessageLink.style.display = 'block';
        }

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
                    message = data.message;
                    pages[pages.length - 1] = `"${message}"`;
                    messageDisplay.textContent = message;
                    showPage(0);
                }
            })
            .catch(error => {
                console.error('Error fetching message:', error);
                messageDisplay.textContent = 'Error loading message.';
            });
    }

    // Remove any existing generate link button
    const generateLinkButton = document.getElementById('generate-link');
    if (generateLinkButton) {
        generateLinkButton.remove();
    }

    // Remove any existing link display
    const linkDisplay = document.getElementById('link-display');
    if (linkDisplay) {
        linkDisplay.remove();
    }
});