document.addEventListener('DOMContentLoaded', () => {
    const storySequence = document.getElementById('story-sequence');
    const storyPage = document.getElementById('story-page');
    const nextButton = document.getElementById('next-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');
    const mainTitle = document.getElementById('main-title');

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
    let message = ''; // We'll get this from localStorage

    const pages = [
        '"I have to tell you something..."',
        '"So I was thinking this..."',
        '"Come closer..."',
        '' // This will be replaced with the actual message
    ];

    function showPage(index) {
        if (index === 0) {
            storyPage.innerText = pages[index];
            storyPage.className = 'page-1 first-message';  // Add 'first-message' class
        } else {
            mainTitle.style.display = 'none';
        }

        storyPage.innerText = index === pages.length - 1 ? `"${message}"` : pages[index];
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
            messageDisplay.textContent = message;
        }

        nextButton.style.display = index < pages.length - 1 ? 'block' : 'none';
    }

    nextButton.addEventListener('click', () => {
        if (pageIndex < pages.length - 1) {
            pageIndex++;
            showPage(pageIndex);
        }
    });

    // Get the message ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        message = localStorage.getItem(id);
        if (message) {
            showPage(0);
        } else {
            storySequence.style.display = 'none';
            finalMessage.style.display = 'block';
            messageDisplay.textContent = 'No message found.';
            mainTitle.style.display = 'none';
        }
    } else {
        storySequence.style.display = 'none';
        finalMessage.style.display = 'block';
        messageDisplay.textContent = 'No message found.';
        mainTitle.style.display = 'none';
    }
});
