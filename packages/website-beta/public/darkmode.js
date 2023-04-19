(function() {
    var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var darkModeOn = darkModeMediaQuery.matches;
    var darkModeStorage = localStorage.getItem('darkMode');
    var darkMode = darkModeStorage ? darkModeStorage === 'true' : darkModeOn;
    document.documentElement.classList.toggle('dark', darkMode);
  })();