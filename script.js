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

    let message = '';

    // Check if elements are found
    if (!writeButton || !messageText || !continueButton || !finalMessage || !messageDisplay || !linkDisplay || !uniqueLink || !copyLinkButton || !mainHeader || !typewriterImage || !initialPage || !nextButton || !secondPage || !secondNextButton || !thirdPage || !thirdNextButton || !secretImage || !earImage || !rizzImage || !prayImage || !comeImage || !eyesImage || !roseImage || !generateMessageLink || !sharedMessageDisplay || !sharedFinalPage) {
        console.error('One or more elements not found in the DOM');
        return;
    }

    writeButton.addEventListener('click', () => {
        mainHeader.style.display = 'none';
        writeButton.style.display = 'none';
        messageText.style.display = 'block';
        continueButton.style.display = 'block';
        typewriterImage.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        message = messageText.value.trim();
        if (message) {
            messageText.style.display = 'none';
            continueButton.style.display = 'none';
            typewriterImage.style.display = 'none';
            finalMessage.style.display = 'block';
            messageDisplay.textContent = message;

            // Generate a link with the encrypted message as a parameter
            const encryptedMessage = encryptMessage(message);
            const link = `${window.location.origin}${window.location.pathname}?m=${encryptedMessage}`;
            uniqueLink.value = link;
            linkDisplay.style.display = 'block';
            copyLinkButton.style.display = 'block';
        }
    });

    copyLinkButton.addEventListener('click', () => {
        uniqueLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    // Check for incoming message in URL
    const urlParams = new URLSearchParams(window.location.search);
    const incomingEncryptedMessage = urlParams.get('m');
    if (incomingEncryptedMessage) {
        try {
            message = decryptMessage(incomingEncryptedMessage);
            document.getElementById('message-form').style.display = 'none';
            initialPage.style.display = 'block';
            mainHeader.style.display = 'block';
        } catch (error) {
            console.error('Error decrypting message:', error);
            // Handle error (e.g., display an error message to the user)
        }
    }

    nextButton.addEventListener('click', () => {
        initialPage.style.display = 'none';
        mainHeader.style.display = 'none';
        secondPage.style.display = 'block';
    });

    secondNextButton.addEventListener('click', () => {
        secondPage.style.display = 'none';
        thirdPage.style.display = 'block';
    });

    thirdNextButton.addEventListener('click', () => {
        thirdPage.style.display = 'none';
        finalMessage.style.display = 'block';
        messageDisplay.textContent = message;
        typewriterImage.style.display = 'none';
        
        // Add the rose image and generate message link
        roseImage.style.display = "block";
        finalMessage.appendChild(roseImage);

        const generateMessageText = document.createElement('p');
        generateMessageText.innerHTML = 'Generate your own message to share with your friends <a href="/">here</a>.';
        finalMessage.appendChild(generateMessageText);
    });

    generateMessageLink.addEventListener('click', () => {
        window.location.href = '/';
    });
});










