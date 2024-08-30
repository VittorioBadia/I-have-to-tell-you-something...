document.addEventListener('DOMContentLoaded', () => {
    const writeButton = document.getElementById('write-button');
    const messageInput = document.getElementById('message-input');
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

    writeButton.addEventListener('click', () => {
        document.body.classList.remove('main-page');
        document.getElementById('message-form').style.display = 'none';
        messageInput.style.display = 'block';
        images.typewriter.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        message = document.getElementById('message-text').value.trim();
        if (message === '') {
            alert("I mean... you need to type something before continuing, that's the point");
            return;
        }
        messageInput.style.display = 'none';
        images.typewriter.style.display = 'none';
        storySequence.style.display = 'block';
        pageIndex = 0;
        showPage(pageIndex);
    });

    nextButton.addEventListener('click', () => {
        if (pageIndex < pages.length - 1) {
            pageIndex++;
            showPage(pageIndex);
        }
    });

    generateLink.addEventListener('click', () => {
        const id = Math.random().toString(36).substring(2, 15);
        const link = `${window.location.origin}/shared.html?id=${id}&message=${encodeURIComponent(message)}`;
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
            generateLink.style.display = 'block';
            messageDisplay.textContent = message; // Add this line
        }

        nextButton.style.display = index < pages.length - 1 ? 'block' : 'none';
    }
});










