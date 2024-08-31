document.addEventListener('DOMContentLoaded', () => {
    // Declare all variables at the top
    const writeButton = document.getElementById('write-button');
    const messageInput = document.getElementById('message-input');
    const messageText = document.getElementById('message-text');
    const continueButton = document.getElementById('continue-button');
    const storySequence = document.getElementById('story-sequence');
    const nextButton = document.getElementById('next-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');
    const generateLink = document.getElementById('generate-link');
    const linkDisplay = document.getElementById('link-display');
    const uniqueLink = document.getElementById('unique-link');
    const copyLinkButton = document.getElementById('copy-link');
    const storyPage = document.getElementById('story-page');
    const mainHeader = document.getElementById('main-header');

    const images = {
        typewriter: document.getElementById('typewriter-image'),
        ear: document.getElementById('ear-image'),
        secret: document.getElementById('secret-image'),
        rizz: document.getElementById('rizz-image'),
        pray: document.getElementById('pray-image'),
        come: document.getElementById('come-image'),
        eyes: document.getElementById('eyes-image'),
        rose: document.getElementById('rose-image')
    };

    let message = '';
    let pageIndex = 0;

    const pages = [
        '"I have to tell you something..."',
        '"It is really really important."',
        '"Come closer..."',
        '' // This will be replaced with the actual message
    ];

    // Create the generateOwnMessage link
    const generateOwnMessage = document.createElement('a');
    generateOwnMessage.textContent = "Generate your own message";
    generateOwnMessage.href = window.location.origin + window.location.pathname;
    generateOwnMessage.style.display = 'none';
    generateOwnMessage.style.position = 'absolute';
    generateOwnMessage.style.bottom = '50px';
    generateOwnMessage.style.left = '50%';
    generateOwnMessage.style.transform = 'translateX(-50%)';
    generateOwnMessage.style.textDecoration = 'none';
    generateOwnMessage.style.color = '#000';
    document.body.appendChild(generateOwnMessage);

    writeButton.addEventListener('click', () => {
        document.body.classList.remove('main-page');
        document.getElementById('message-form').style.display = 'none';
        messageInput.style.display = 'block';
        images.typewriter.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        message = messageText.value.trim();
        if (message) {
            // Hide message input and typewriter image
            messageInput.style.display = 'none';
            images.typewriter.style.display = 'none';
            
            // Show final message section with generate link button
            finalMessage.style.display = 'block';
            document.getElementById('message-display').textContent = message;
            
            // Hide story sequence (it will only be shown for link recipients)
            document.getElementById('story-sequence').style.display = 'none';
        }
    });

    nextButton.addEventListener('click', () => {
        if (pageIndex < pages.length - 1) {
            pageIndex++;
            showPage(pageIndex);
        }
    });

    generateLink.addEventListener('click', () => {
        const id = Math.random().toString(36).substr(2, 9);
        localStorage.setItem(id, message);
        const link = `${window.location.origin}${window.location.pathname}?id=${id}`;
        uniqueLink.value = link;
        linkDisplay.style.display = 'block';
    });

    copyLinkButton.addEventListener('click', () => {
        uniqueLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    function showPage(index) {
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
            // Show the "Generate your own message" link on the last page
            generateOwnMessage.style.display = 'block';
        }

        nextButton.style.display = index < pages.length - 1 ? 'block' : 'none';
    }

    const authorName = document.querySelector('h4');
    if (authorName) {
        authorName.style.cursor = 'pointer';
        authorName.addEventListener('click', () => {
            window.location.href = 'info.html';
        });
    }

    // Modify the logic for handling incoming links
    const urlParams = new URLSearchParams(window.location.search);
    const incomingId = urlParams.get('id');
    if (incomingId) {
        message = localStorage.getItem(incomingId);
        if (message) {
            document.getElementById('message-form').style.display = 'none';
            document.getElementById('story-sequence').style.display = 'block';
            generateLink.style.display = 'none';
            if (mainHeader) {
                mainHeader.style.display = 'none';
            }
            pageIndex = 0;
            showPage(pageIndex);
        } else {
            // Handle case where message is not found
            finalMessage.style.display = 'block';
            messageDisplay.textContent = 'Message not found.';
            generateOwnMessage.style.display = 'block';
            if (mainHeader) {
                mainHeader.style.display = 'none';
            }
        }
    } else {
        // This is the main page, hide the "Generate your own message" link
        generateOwnMessage.style.display = 'none';
    }

    // ... rest of the code ...
});










