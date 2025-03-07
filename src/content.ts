const adjustVolumeOnScroll = () => {
  const video = document.querySelector("video");

  if (!video) {
    console.warn("Nenhum vídeo encontrado.");
    return;
  }

  video.addEventListener("wheel", (event) => {
    event.preventDefault(); // Evita o scroll normal da página

    const volumeStep = 0.05; // Quantidade de volume ajustado por scroll
    if (event.deltaY < 0) {
      // Scroll para cima → Aumenta volume
      video.volume = Math.min(video.volume + volumeStep, 1);
    } else {
      // Scroll para baixo → Diminui volume
      video.volume = Math.max(video.volume - volumeStep, 0);
    }
  });
};

// Aguarda o carregamento da página para ativar a função
const init = () => {
  // Aguardar o vídeo carregar
  const observer = new MutationObserver(() => {
    if (document.querySelector("video")) {
      observer.disconnect();
      adjustVolumeOnScroll();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

// Iniciar script
init();
