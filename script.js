const products=[
 {id:1,name:'Vela Brisa de Figo',price:79.9,category:'bem-estar',emoji:'🕯️',tag:'MAIS VENDIDO'},
 {id:2,name:'Caderno Entrelinhas',price:49.9,category:'papelaria',emoji:'📓',tag:'NOVIDADE'},
 {id:3,name:'Bolsa Aura',price:189.9,category:'estilo',emoji:'👜',tag:''},
 {id:4,name:'Vaso Terracota',price:119.9,category:'casa',emoji:'🏺',tag:''},
 {id:5,name:'Caneca Amanhecer',price:59.9,category:'casa',emoji:'☕',tag:''},
 {id:6,name:'Lenço Campo',price:69.9,category:'estilo',emoji:'🧣',tag:'EDIÇÃO LIMITADA'},
 {id:7,name:'Sabonete Oliva',price:29.9,category:'bem-estar',emoji:'🧼',tag:''},
 {id:8,name:'Cartões de Afeto',price:39.9,category:'papelaria',emoji:'💌',tag:''}
];
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
let cart=JSON.parse(localStorage.getItem('zaniboni-cart')||'[]');let category='todos';
const grid=document.querySelector('#productGrid'),cartPanel=document.querySelector('#cartPanel'),overlay=document.querySelector('#overlay');
function renderProducts(list=products){grid.innerHTML=list.filter(p=>category==='todos'||p.category===category).map(p=>`<article class="product"><div class="product-art">${p.tag?`<span class="product-tag">${p.tag}</span>`:''}${p.emoji}</div><div class="product-info"><h3>${p.name}</h3><p>${money(p.price)}</p><button aria-label="Adicionar ${p.name}" data-add="${p.id}">+</button></div></article>`).join('');}
function save(){localStorage.setItem('zaniboni-cart',JSON.stringify(cart));}
function renderCart(){const count=cart.reduce((sum,x)=>sum+x.qty,0),total=cart.reduce((sum,x)=>sum+x.price*x.qty,0);document.querySelector('#cartCount').textContent=count;const items=document.querySelector('#cartItems'),empty=document.querySelector('#cartEmpty'),footer=document.querySelector('#cartFooter');items.innerHTML=cart.map(p=>`<div class="cart-line"><div class="cart-emoji">${p.emoji}</div><div><h3>${p.name}</h3><p>${p.qty} × ${money(p.price)}</p><button class="remove" data-remove="${p.id}">Remover</button></div></div>`).join('');empty.style.display=cart.length?'none':'block';footer.style.display=cart.length?'block':'none';document.querySelector('#cartTotal').textContent=money(total);}
function add(id){const product=products.find(p=>p.id===id),inCart=cart.find(p=>p.id===id);if(inCart)inCart.qty++;else cart.push({...product,qty:1});save();renderCart();openCart();}
function openCart(){cartPanel.classList.add('open');overlay.classList.add('open');cartPanel.setAttribute('aria-hidden','false')};function closeCart(){cartPanel.classList.remove('open');overlay.classList.remove('open');cartPanel.setAttribute('aria-hidden','true')}
grid.addEventListener('click',e=>{const id=e.target.dataset.add;if(id)add(+id)});document.querySelector('.filters').addEventListener('click',e=>{if(!e.target.matches('.filter'))return;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));e.target.classList.add('active');category=e.target.dataset.category;renderProducts()});
document.querySelector('#allButton').onclick=()=>{category='todos';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.category==='todos'));renderProducts()};document.querySelector('#cartButton').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;overlay.onclick=closeCart;document.querySelector('#continueShopping').onclick=closeCart;
document.querySelector('#cartItems').onclick=e=>{const id=e.target.dataset.remove;if(id){cart=cart.filter(p=>p.id!==+id);save();renderCart()}};
document.querySelector('#checkoutButton').onclick=()=>alert('Obrigada pelo seu pedido! Esta é uma demonstração de checkout.');
const dialog=document.querySelector('#searchDialog'),input=document.querySelector('#searchInput'),results=document.querySelector('#searchResults');document.querySelector('#searchButton').onclick=()=>{dialog.showModal();input.focus()};input.oninput=()=>{const term=input.value.toLowerCase();results.innerHTML=products.filter(p=>p.name.toLowerCase().includes(term)).map(p=>`<button class="search-result" data-search-add="${p.id}"><span>${p.emoji} ${p.name}</span><span>${money(p.price)} +</span></button>`).join('')||'<p>Nenhum item encontrado.</p>'};results.onclick=e=>{const id=e.target.closest('[data-search-add]')?.dataset.searchAdd;if(id){dialog.close();add(+id)}};
document.querySelector('#newsletterForm').onsubmit=e=>{e.preventDefault();document.querySelector('#formMessage').textContent='Pronto! Você agora faz parte da nossa lista.';e.target.reset()};renderProducts();renderCart();
