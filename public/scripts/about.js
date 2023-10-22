// When the title is clicked, it will change its text and color.
document.querySelector('.blinking-title').addEventListener('click', function() {
    let title = document.querySelector('.blinking-title');
    if (title.innerText === 'About Me') {
        title.innerText = 'Jane - Retro Gamer';
        title.style.color = '#0f0';  // Bright green for a retro feel
    } else {
        title.innerText = 'About Me';
        title.style.color = '#fff';
    }
});
