const authorName = document.querySelector('img');
if (authorName) {
    authorName.style.cursor = 'pointer';
    authorName.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
