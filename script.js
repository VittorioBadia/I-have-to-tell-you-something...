function encryptMessage(message) {
    return btoa(encodeURIComponent(message));
}

function decryptMessage(encryptedMessage) {
    return decodeURIComponent(atob(encryptedMessage));
}

document.addEventListener('DOMContentLoaded', () => {
    const writeButton = document.getElementById('write-button');
    const messageText = document.getElementById('message-text');
    const continueButton = document.getElementById('continue-button');
    const finalMessage = document.getElementById('final-message');
    const messageDisplay = document.getElementById('message-display');
    const linkDisplay = document.getElementById('link-display');
    const uniqueLink = document.getElementById('unique-link');
    const copyLinkButton = document.getElementById('copy-link');
    const mainHeader = document.getElementById('main-header');
    const typewriterImage = document.getElementById('typewriter-image');
    const initialPage = document.getElementById('initial-page');
    const nextButton = document.getElementById('next-button');
    const secondPage = document.getElementById('second-page');
    const secondNextButton = document.getElementById('second-next-button');
    const thirdPage = document.getElementById('third-page');
    const thirdNextButton = document.getElementById('third-next-button');
    const secretImage = document.getElementById('secret-image');
    const earImage = document.getElementById('ear-image');
    const rizzImage = document.getElementById('rizz-image');
    const prayImage = document.getElementById('pray-image');
    const comeImage = document.getElementById('come-image');
    const eyesImage = document.getElementById('eyes-image');
    const roseImage = document.getElementById('rose-image');
    const generateMessageLink = document.getElementById('generate-message-link');
    const sharedMessageDisplay = document.getElementById('shared-message-display');
    const sharedFinalPage = document.getElementById('shared-final-page');
    const homeIcon = document.getElementById('home-icon');
    const homeIconMessage = document.getElementById('home-icon-message');
    const homeIconLink = document.getElementById('home-icon-link');

    let message = '';

    homeIcon.style.display = 'block';

    if (!writeButton || !messageText || !continueButton || !finalMessage || !messageDisplay || !linkDisplay || !uniqueLink || !copyLinkButton || !mainHeader || !typewriterImage || !initialPage || !nextButton || !secondPage || !secondNextButton || !thirdPage || !thirdNextButton || !secretImage || !earImage || !rizzImage || !prayImage || !comeImage || !eyesImage || !roseImage || !generateMessageLink || !sharedMessageDisplay || !sharedFinalPage || !homeIcon || !homeIconMessage || !homeIconLink) {
        console.error('One or more elements not found in the DOM');
        return;
    }

    homeIcon.addEventListener('click', () => {
        window.location.href = '/';
    });

    homeIconMessage.addEventListener('click', () => {
        window.location.href = '/';
    });

    homeIconLink.addEventListener('click', () => {
        window.location.href = '/';
    });

    writeButton.addEventListener('click', () => {
        mainHeader.style.display = 'none';
        writeButton.style.display = 'none';
        messageText.style.display = 'block';
        continueButton.style.display = 'block';
        typewriterImage.style.display = 'block';
        homeIcon.style.display = 'block';
        homeIconMessage.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        message = messageText.value.trim();
        if (message) {
            messageText.style.display = 'none';
            continueButton.style.display = 'none';
            typewriterImage.style.display = 'none';
            finalMessage.style.display = 'block';
            messageDisplay.textContent = message;
            homeIconMessage.style.display = 'none';

            const encryptedMessage = encryptMessage(message);
            const link = `${window.location.origin}${window.location.pathname}?m=${encryptedMessage}`;
            uniqueLink.value = link;
            linkDisplay.style.display = 'block';
            copyLinkButton.style.display = 'block';
            homeIcon.style.display = 'block';
            homeIconLink.style.display = 'block';
        }
    });

    copyLinkButton.addEventListener('click', () => {
        uniqueLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
        homeIcon.style.display = 'block';
        homeIconLink.style.display = 'block';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const incomingEncryptedMessage = urlParams.get('m');
    if (incomingEncryptedMessage) {
        try {
            message = decryptMessage(incomingEncryptedMessage);
            document.getElementById('message-form').style.display = 'none';
            initialPage.style.display = 'block';
            mainHeader.style.display = 'block';
            homeIcon.style.display = 'block';
        } catch (error) {
            console.error('Error decrypting message:', error);
        }
    }

    nextButton.addEventListener('click', () => {
        initialPage.style.display = 'none';
        secondPage.style.display = 'block';
        mainHeader.style.display = 'none';
        homeIcon.style.display = 'block';
    });

    secondNextButton.addEventListener('click', () => {
        secondPage.style.display = 'none';
        thirdPage.style.display = 'block';
        mainHeader.style.display = 'none';
        homeIcon.style.display = 'block';
    });

    thirdNextButton.addEventListener('click', () => {
        thirdPage.style.display = 'none';
        finalMessage.style.display = 'block';
        messageDisplay.textContent = message;
        typewriterImage.style.display = 'none';
        roseImage.style.display = "block";
        finalMessage.appendChild(roseImage);

        const generateMessageText = document.createElement('p');
        generateMessageText.innerHTML = 'Generate your own message to share with your friends <a href="/">here</a>.';
        finalMessage.appendChild(generateMessageText);
        homeIcon.style.display = 'block';
    });

    generateMessageLink.addEventListener('click', () => {
        window.location.href = '/';
        homeIcon.style.display = 'block';
    });
});










