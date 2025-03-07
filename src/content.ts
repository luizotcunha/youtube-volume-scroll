const createVolumeDisplay = (): HTMLDivElement => {
  // Criar um elemento de exibição de volume
  const volumeIndicator = document.createElement("div");
  volumeIndicator.id = "yt-volume-indicator";
  volumeIndicator.style.position = "fixed";
  volumeIndicator.style.bottom = "15%";
  volumeIndicator.style.left = "50%";
  volumeIndicator.style.transform = "translateX(-50%)";
  volumeIndicator.style.background = "rgba(0, 0, 0, 0.7)";
  volumeIndicator.style.color = "#fff";
  volumeIndicator.style.padding = "10px 20px";
  volumeIndicator.style.fontSize = "20px";
  volumeIndicator.style.borderRadius = "8px";
  volumeIndicator.style.display = "none";
  volumeIndicator.style.transition = "opacity 0.3s ease-out";
  volumeIndicator.style.zIndex = "99999";
  volumeIndicator.style.pointerEvents = "none"; // Impede que interfira no vídeo

  document.body.appendChild(volumeIndicator);
  return volumeIndicator;
};

const adjustVolumeOnScroll = () => {
  const video = document.querySelector("video");
  if (!video) return console.warn("Nenhum vídeo encontrado.");

  const volumeIndicator = createVolumeDisplay();

  video.addEventListener("wheel", (event) => {
    event.preventDefault(); // Evita o scroll normal da página

    const volumeStep = 0.05; // Passo de volume (5%)
    if (event.deltaY < 0) {
      video.volume = Math.min(video.volume + volumeStep, 1);
    } else {
      video.volume = Math.max(video.volume - volumeStep, 0);
    }

    // Exibir o volume na tela
    volumeIndicator.textContent = `🔊 ${(video.volume * 100).toFixed(0)}%`;
    volumeIndicator.style.display = "block";
    volumeIndicator.style.opacity = "1";

    // Esconder após 1 segundo
    clearTimeout((volumeIndicator as any)._hideTimeout);
    (volumeIndicator as any)._hideTimeout = setTimeout(() => {
      volumeIndicator.style.opacity = "0";
      setTimeout(() => {
        volumeIndicator.style.display = "none";
      }, 300);
    }, 1000);
  });
};

// Aguarda o carregamento do vídeo antes de ativar a função
const init = () => {
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
