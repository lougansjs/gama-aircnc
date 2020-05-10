if (navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js', { scope: '/' }).then(function(reg) {
      console.log('[Companion]', 'Service worker foi registrado!');
      console.log(reg);
  });
}

window.addEventListener('beforeinstallprompt', function(e) {
  e.userChoice.then(function(choiceResult) {
    console.log(choiceResult.outcome);
    if (choiceResult.outcome == 'dismissed') {
      console.log('Evento cancelado');
    } else {
      console.log('Adicionar Artia App na Tela Inicial');
    }
  });
});