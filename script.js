const SERVER_URL = 'http://localhost:3000';  // Add this at the top of your script

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
    const storyPage = document.getElementById('story-page');
    const typewriterImage = document.getElementById('typewriter-image');
    const earImage = document.getElementById('ear-image');
    const secretImage = document.getElementById('secret-image');
    const rizzImage = document.getElementById('rizz-image');
    const prayImage = document.getElementById('pray-image');
    const comeImage = document.getElementById('come-image');
    const eyesImage = document.getElementById('eyes-image');
    const roseImage = document.getElementById('rose-image'); // New image reference

    let message = '';
    let pageIndex = 0;

    // Ensure h1 and h4 are shown only on the main page
    document.body.classList.add('main-page');

    writeButton.addEventListener('click', () => {
        document.body.classList.remove('main-page'); // Hide header on subsequent pages
        document.getElementById('message-form').style.display = 'none';
        messageInput.style.display = 'block';
        typewriterImage.style.display = 'block'; // Show the typewriter image
    });

    continueButton.addEventListener('click', () => {
        message = document.getElementById('message-text').value;
        if (message.trim() === '') {
            alert('I mean... you need to type something before continuing, that\'s the point');
            return;
        }
        messageInput.style.display = 'none';
        typewriterImage.style.display = 'none'; // Hide the typewriter image on next pages
        storySequence.style.display = 'block';
        pageIndex = 0; // Reset pageIndex when starting the story sequence
        storyPage.innerText = '"I have to tell you something..."';
        storyPage.classList.add('page-1'); // Set the initial class

        // Show the images for page 1
        earImage.style.display = 'block';
        secretImage.style.display = 'block';
        rizzImage.style.display = 'none'; // Hide page 2 images by default
        prayImage.style.display = 'none'; // Hide page 2 images by default
        comeImage.style.display = 'none'; // Hide page 3 images by default
        eyesImage.style.display = 'none'; // Hide page 3 images by default
        roseImage.style.display = 'none'; // Hide final page image by default
    });

    nextButton.addEventListener('click', () => {
        const pages = [
            '"So I was thinking this..."',
            '"It is really really important."',
            '"Come closer..."',
            `"${message}"`
        ];

        pageIndex++;
        if (pageIndex < pages.length) {
            storyPage.innerText = pages[pageIndex];

            // Remove all page classes
            storyPage.classList.remove('page-1', 'page-2', 'page-3', 'final-page');

            // Hide the images for other pages
            earImage.style.display = 'none';
            secretImage.style.display = 'none';
            rizzImage.style.display = 'none'; // Hide page 2 images
            prayImage.style.display = 'none'; // Hide page 2 images
            comeImage.style.display = 'none'; // Hide page 3 images
            eyesImage.style.display = 'none'; // Hide page 3 images
            roseImage.style.display = 'none'; // Hide final page image

            // Add the current page class
            if (pageIndex === 0) {
                storyPage.classList.add('page-1');
                // Show the images for page 1
                earImage.style.display = 'block';
                secretImage.style.display = 'block';
            } else if (pageIndex === 1) {
                storyPage.classList.add('page-2');
                // Show the images for page 2
                rizzImage.style.display = 'block';
                prayImage.style.display = 'block';
            } else if (pageIndex === 2) {
                storyPage.classList.add('page-3');
                // Show the images for page 3
                comeImage.style.display = 'block';
                eyesImage.style.display = 'block';
            } else if (pageIndex === pages.length - 1) {
                storyPage.classList.add('final-page');
                // Show the image for the final page
                roseImage.style.display = 'block';
                finalMessage.style.display = 'block'; // Ensure final message container is visible
                messageDisplay.innerText = message; // Display the final message in the messageDisplay element
                storySequence.style.display = 'none';
                generateLink.style.display = 'block'; // Ensure generate link button is visible
            }
        }
    });

    generateLink.addEventListener('click', () => {
        fetch(`${SERVER_URL}/save-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            uniqueLink.href = data.link;
            uniqueLink.innerText = data.link;
            linkDisplay.style.display = 'block';
        })
        .catch(error => {
            console.error('Error generating link:', error);
            alert('An error occurred while generating the link. Please try again.');
        });
    });

    // Load message if an ID is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const messageId = urlParams.get('id');

    if (messageId) {
        // We're viewing a shared message
        fetch(`${SERVER_URL}/message/${messageId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.message) {
                    message = data.message;
                    document.getElementById('message-form').style.display = 'none';
                    storySequence.style.display = 'block';
                    pageIndex = 0;
                    showPage(pageIndex);
                }
            })
            .catch(error => {
                console.error('Error fetching message:', error);
            });
    } else {
        // We're on the main page to create a new message
        document.getElementById('message-form').style.display = 'block';
    }

    function showPage(index) {
        const pages = [
            '"I have to tell you something..."',
            '"So I was thinking this..."',
            '"It is really really important."',
            '"Come closer..."',
            `"${message}"`
        ];

        if (index < pages.length) {
            storyPage.innerText = pages[index];

            // Remove all page classes
            storyPage.classList.remove('page-1', 'page-2', 'page-3', 'final-page');

            // Hide all images
            earImage.style.display = 'none';
            secretImage.style.display = 'none';
            rizzImage.style.display = 'none';
            prayImage.style.display = 'none';
            comeImage.style.display = 'none';
            eyesImage.style.display = 'none';
            roseImage.style.display = 'none';

            // Set the current page
            if (index === 0) {
                storyPage.classList.add('page-1');
                earImage.style.display = 'block';
                secretImage.style.display = 'block';
            } else if (index === 1) {
                storyPage.classList.add('page-2');
                rizzImage.style.display = 'block';
                prayImage.style.display = 'block';
            } else if (index === 2) {
                storyPage.classList.add('page-3');
                comeImage.style.display = 'block';
                eyesImage.style.display = 'block';
            } else if (index === pages.length - 1) {
                storyPage.classList.add('final-page');
                roseImage.style.display = 'block';
            }
        }
    }
});










