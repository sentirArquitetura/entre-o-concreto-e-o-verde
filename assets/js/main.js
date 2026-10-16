/* Entre o Concreto e o Verde — comportamento da landing page */
(() => {
  'use strict';

  const CONFIG = {
    // Código do site no GoatCounter (o "CODIGO" de https://CODIGO.goatcounter.com).
    // Deixe vazio ('') para desligar a contagem.
    goatcounter: 'concretoeverde',
    // Nome do evento registrado a cada clique em um botão de compra.
    eventoCompra: 'clique-onde-comprar',
  };

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Barra de compra + progresso + trepadeira ---------- */

  const raiz = document.documentElement;
  const topo = document.querySelector('[data-topo]');
  const botaoAbertura = document.querySelector('.abertura__acoes .botao');
  const caule = document.querySelector('.trepadeira__caule');
  const folhas = [...document.querySelectorAll('.trepadeira__folha')].map((el) => ({
    el,
    pos: parseFloat(el.style.getPropertyValue('--y')) / 100,
  }));

  let agendado = false;
  function aoRolar() {
    agendado = false;
    const max = raiz.scrollHeight - window.innerHeight;
    const progresso = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    raiz.style.setProperty('--progresso', progresso.toFixed(4));
    if (caule) caule.style.strokeDashoffset = (1 - progresso).toFixed(4);
    for (const f of folhas) f.el.classList.toggle('is-viva', progresso >= f.pos);

    // A barra desce assim que o botão de compra da abertura sai da tela.
    const limite = botaoAbertura
      ? botaoAbertura.getBoundingClientRect().bottom + window.scrollY
      : window.innerHeight;
    topo.classList.toggle('is-visivel', window.scrollY > limite);
  }
  window.addEventListener('scroll', () => {
    if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  window.addEventListener('resize', aoRolar);
  aoRolar();

  /* ---------- Revelar ao rolar ---------- */

  const revelaveis = document.querySelectorAll('.revelar');
  if (reduzMovimento || !('IntersectionObserver' in window)) {
    revelaveis.forEach((el) => el.classList.add('is-visivel'));
  } else {
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visivel');
          obs.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revelaveis.forEach((el) => obs.observe(el));
  }

  /* ---------- Contagem de visitas e cliques (GoatCounter) ---------- */

  if (!CONFIG.goatcounter) return;
  const base = `https://${CONFIG.goatcounter}.goatcounter.com`;

  // Script oficial: conta a visita e os cliques em [data-goatcounter-click].
  const gc = document.createElement('script');
  gc.async = true;
  gc.src = 'https://gc.zgo.at/count.js';
  gc.dataset.goatcounter = `${base}/count`;
  document.head.appendChild(gc);

  // Exibe no rodapé, disfarçado de código de referência: "ref. CE-<visitas>/<cliques>".
  // Acrescente ?painel ao endereço para ver os números com legenda.
  const alvo = document.querySelector('[data-contador]');
  if (!alvo) return;

  async function total(caminho) {
    try {
      const r = await fetch(`${base}/counter/${encodeURIComponent(caminho)}.json`);
      if (!r.ok) return 0; // 404 = ainda sem registros
      const dados = await r.json();
      return parseInt(String(dados.count).replace(/\D/g, ''), 10) || 0;
    } catch {
      return null;
    }
  }

  Promise.all([total('TOTAL'), total(CONFIG.eventoCompra)]).then(([visitas, cliques]) => {
    if (visitas === null) return; // bloqueado ou fora do ar: não mostra nada
    const painel = new URLSearchParams(location.search).has('painel');
    if (painel) {
      alvo.textContent = `Visitas: ${visitas.toLocaleString('pt-BR')} · Cliques em “onde comprar”: ${(cliques || 0).toLocaleString('pt-BR')}`;
      alvo.classList.add('is-painel');
    } else {
      alvo.textContent = `ref. CE-${String(visitas).padStart(4, '0')}/${String(cliques || 0).padStart(3, '0')}`;
      alvo.setAttribute('aria-hidden', 'true');
    }
    alvo.hidden = false;
  });
})();
