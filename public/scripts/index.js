class Main {
  constructor() {
    this.clockDiv = document.getElementById('clock');
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.pageViewsKey = 'pageViewsCount';
    this.initializeCounter();
    this.displayCount();
    this.createRandomAnimations();
    this.setupLinkClickListener();
    this.switchStylesheet();
  }

  initializeCounter() {
    if (!localStorage.getItem(this.pageViewsKey)) {
      localStorage.setItem(this.pageViewsKey, '0');
    }
  }

  incrementCount() {
    let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
    currentCount++;
    localStorage.setItem(this.pageViewsKey, currentCount.toString());
  }

  displayCount() {
    this.incrementCount();
    const countDiv = document.getElementById('count');
    if (countDiv) {
      countDiv.innerHTML = 'You have visited this page ' + localStorage.getItem(this.pageViewsKey) + ' times.';
    } else {
      console.error('Element with id "count" not found.');
    }
  }

  updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (this.clockDiv) {
      this.clockDiv.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
      console.error('Clock element not found!');
    }
  }


  createRandomAnimations() {
    for (let i = 0; i < 50; i++) {
      const div = document.createElement('div');
      div.classList.add('animation');
      div.style.left = Math.random() * window.innerWidth + 'px';
      div.style.top = Math.random() * window.innerHeight + 'px';
      div.style.animationDuration = Math.random() * 2 + 3 + 's';
      div.style.animationDelay = '-' + Math.random() * 2 + 's';
      document.body.appendChild(div);
    }
  }

  setupLinkClickListener() {
    const adventureLink = document.getElementById('sephoraLink');
    if (adventureLink) {
      adventureLink.addEventListener('click', function(event) {
        event.preventDefault();
        const userResponse = confirm("Get your wallet out!");
        if (userResponse) {
          window.location.href = this.href;
        }
      });
    } else {
      console.error('Element with id "sephoraLink" not found.');
    }
  }

  switchStylesheet() {
    const switchStyle = document.getElementById('switch-style');
    const stylesheet1 = document.getElementById('stylesheet1');
    const stylesheet2 = document.getElementById('stylesheet2');
    if(switchStyle) {
      switchStyle.addEventListener('click', function(event) {
        event.preventDefault();
        document.mainClass.toggleStylesheets();
      });
    }
  }
  
  toggleStylesheets() {
    const stylesheet1 = document.getElementById('stylesheet1');
    const stylesheet2 = document.getElementById('stylesheet2');
    if (stylesheet1 && stylesheet2) {
      if (stylesheet1.disabled) {
        stylesheet1.disabled = false;
        stylesheet2.disabled = true;
      } else {
        stylesheet1.disabled = true;
        stylesheet2.disabled = false;
      }
    } else {
      console.error('Stylesheets with id "stylesheet1" or "stylesheet2" not found.');
    }
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.mainClass = new Main();
});
