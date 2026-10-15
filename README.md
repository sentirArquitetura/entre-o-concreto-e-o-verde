# Entre o Concreto e o Verde — landing page

Página de venda do livro de Fernanda Familiar. HTML, CSS e JS puros, sem build: é só publicar no GitHub Pages.

```
index.html              página
assets/css/style.css    estilos (paleta no topo do arquivo, em :root)
assets/js/main.js       animações + contador (configuração no topo)
assets/img/             fotos do livro e favicon
```

## Publicar no GitHub Pages

1. Envie os arquivos para `main` em https://github.com/sentirArquitetura/entre-o-concreto-e-o-verde
2. No repositório: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**
3. Em ~1 minuto o site fica em https://sentirarquitetura.github.io/entre-o-concreto-e-o-verde/

## Contador de visitas e de cliques em "onde comprar"

O GitHub Pages só serve arquivos estáticos, então a contagem usa o **GoatCounter** (gratuito, sem cookies, sem banner de LGPD).

1. Crie uma conta em https://www.goatcounter.com/signup usando o código **`concretoeverde`**
   (se escolher outro código, troque `goatcounter: 'concretoeverde'` em `assets/js/main.js`).
2. No painel do GoatCounter: **Settings → marque "Allow adding visitor counts on your website" → Save**.
   Sem isso a contagem funciona, mas o número não aparece no rodapé.

O que é contado:

- **Visitas**: cada acesso à página.
- **Cliques em comprar**: todos os botões que levam à Amazon (topo, abertura, fechamento e ficha) registram o evento `clique-onde-comprar`. No painel do GoatCounter dá para ver de qual botão veio cada clique.

### Onde ver os números

- **Painel completo** (privado): `https://concretoeverde.goatcounter.com`
- **Rodapé do site**: aparece um código discreto, como `ref. CE-1234/087`
  → `1234` = visitas, `087` = cliques em comprar.
- **Rodapé com legenda**: abra o site com `?painel` no final do endereço
  (`.../entre-o-concreto-e-o-verde/?painel`).

Observações: acessos pelo próprio computador (`localhost`/arquivo local) não são contados, e quem usa bloqueador de anúncios pode não entrar na contagem.

## Trocar o link de compra

O link `https://www.amazon.com.br/dp/B0GVBBC9XH` aparece em 4 botões no `index.html`. Para trocar, busque por `B0GVBBC9XH` e substitua.

## Imagens

Todas ficam em `assets/img/`. Para trocar uma foto, substitua o arquivo mantendo o mesmo nome. O carrossel ("O livro de perto") está no `index.html`, dentro de `<ul class="carrossel__trilho">`: cada `<li>` é uma foto.
