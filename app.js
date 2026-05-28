/* =============================
   AGRO TECH — JavaScript
   ============================= */

'use strict';

// ─── STATE ──────────────────────────────────────────────
const state = {
  apiKey: 'AIzaSyAiabDwOSb1ewNchApzsLxNZik2iib20P4',
  messages: [],        // { role, content }
  sessions: [],        // { id, title, messages }
  currentSessionId: null,
  loading: false,
  theme: 'light',
};

// ─── DOM REFS ────────────────────────────────────────────
const sidebar       = document.getElementById('sidebar');
const overlay       = document.getElementById('overlay');
const menuBtn       = document.getElementById('menuBtn');
const sidebarToggle = document.getElementById('sidebarToggle');
const newChatBtn    = document.getElementById('newChatBtn');
const chatHistory   = document.getElementById('chatHistory');
const themeBtn      = document.getElementById('themeBtn');
const iconSun       = document.getElementById('iconSun');
const iconMoon      = document.getElementById('iconMoon');
const welcomeScreen = document.getElementById('welcomeScreen');
const messagesEl    = document.getElementById('messages');
const chatArea      = document.getElementById('chatArea');
const queryInput    = document.getElementById('queryInput');
const sendBtn       = document.getElementById('sendBtn');
const apiKeyInput   = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const mainEl        = document.getElementById('main');

// ─── INIT ─────────────────────────────────────────────────
function init() {
  loadFromStorage();
  renderHistory();
  applyTheme();

  queryInput.addEventListener('keydown', onInputKeydown);
  queryInput.addEventListener('input', autoResize);
  sendBtn.addEventListener('click', handleSend);
  menuBtn.addEventListener('click', openSidebar);
  sidebarToggle.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
  newChatBtn.addEventListener('click', startNewChat);
  themeBtn.addEventListener('click', toggleTheme);
  saveApiKeyBtn.addEventListener('click', saveApiKey);

  document.querySelectorAll('.suggestion-card').forEach(btn => {
    btn.addEventListener('click', () => {
      queryInput.value = btn.dataset.q;
      autoResize();
      handleSend();
    });
  });
}

// ─── STORAGE ──────────────────────────────────────────────
function loadFromStorage() {
  state.apiKey = localStorage.getItem('agro_api_key') || '';
  state.theme  = localStorage.getItem('agro_theme') || 'light';
  const raw = localStorage.getItem('agro_sessions');
  state.sessions = raw ? JSON.parse(raw) : [];

  if (state.apiKey) {
    apiKeyInput.value = '••••••••••••••••';
  }
}

function saveToStorage() {
  localStorage.setItem('agro_sessions', JSON.stringify(state.sessions));
}

// ─── API KEY ──────────────────────────────────────────────
function saveApiKey() {
  const val = apiKeyInput.value.trim();
  if (!val || val.startsWith('•')) return;
  if (!val.startsWith('sk-ant-')) {
    showToast('⚠️ Chave inválida. Deve começar com sk-ant-');
    return;
  }
  state.apiKey = val;
  localStorage.setItem('agro_api_key', val);
  apiKeyInput.value = '••••••••••••••••';
  showToast('✅ Chave da API salva com sucesso!');
}

// ─── THEME ────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  if (state.theme === 'dark') {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  } else {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('agro_theme', state.theme);
  applyTheme();
}

// ─── SIDEBAR ─────────────────────────────────────────────
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
}

function toggleSidebarDesktop() {
  const hidden = sidebar.classList.toggle('hidden');
  mainEl.classList.toggle('expanded', hidden);
}

// ─── CHAT SESSIONS ────────────────────────────────────────
function startNewChat() {
  state.messages = [];
  state.currentSessionId = null;
  messagesEl.innerHTML = '';
  welcomeScreen.style.display = '';
  queryInput.value = '';
  autoResize();
  document.querySelectorAll('.history-item').forEach(el => el.classList.remove('active'));
  closeSidebar();
}

function getSessionTitle(firstMessage) {
  return firstMessage.length > 50
    ? firstMessage.slice(0, 48) + '…'
    : firstMessage;
}

function saveSession(firstMsg) {
  if (!state.currentSessionId) {
    state.currentSessionId = Date.now().toString();
    state.sessions.unshift({
      id: state.currentSessionId,
      title: getSessionTitle(firstMsg),
      messages: state.messages,
    });
  } else {
    const session = state.sessions.find(s => s.id === state.currentSessionId);
    if (session) session.messages = state.messages;
  }
  saveToStorage();
  renderHistory();
}

function loadSession(id) {
  const session = state.sessions.find(s => s.id === id);
  if (!session) return;
  state.currentSessionId = id;
  state.messages = session.messages;
  messagesEl.innerHTML = '';
  welcomeScreen.style.display = 'none';

  session.messages.forEach(msg => {
    if (msg.role === 'user') appendUserMessage(msg.content);
    else appendAIMessage(msg.content);
  });
  closeSidebar();
}

function renderHistory() {
  chatHistory.innerHTML = '';
  if (state.sessions.length === 0) {
    chatHistory.innerHTML = `<p style="font-size:12px;color:var(--text-sidebar-muted);padding:10px 12px;">Sem histórico ainda.</p>`;
    return;
  }
  state.sessions.forEach(session => {
    const item = document.createElement('button');
    item.className = 'history-item' + (session.id === state.currentSessionId ? ' active' : '');
    item.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span style="overflow:hidden;text-overflow:ellipsis">${escapeHtml(session.title)}</span>
    `;
    item.addEventListener('click', () => loadSession(session.id));
    chatHistory.appendChild(item);
  });
}

// ─── SEND MESSAGE ─────────────────────────────────────────
function onInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

async function handleSend() {
  const query = queryInput.value.trim();
  if (!query || state.loading) return;

  if (!state.apiKey) {
    showToast('⚠️ Insira sua chave da API no menu lateral antes de continuar.');
    openSidebar();
    return;
  }

  welcomeScreen.style.display = 'none';
  queryInput.value = '';
  autoResize();

  state.messages.push({ role: 'user', content: query });
  appendUserMessage(query);
  saveSession(query);

  state.loading = true;
  sendBtn.disabled = true;

  const typingId = showTyping();

  try {
    const reply = await callClaudeAPI(state.messages);
    removeTyping(typingId);
    state.messages.push({ role: 'assistant', content: reply });
    appendAIMessage(reply);
    saveSession(query);
  } catch (err) {
    removeTyping(typingId);
    const errMsg = getErrorMessage(err);
    appendAIMessage(`❌ **Erro:** ${errMsg}`);
  } finally {
    state.loading = false;
    sendBtn.disabled = false;
    scrollBottom();
  }
}

// ─── API CALL ─────────────────────────────────────────────
async function callClaudeAPI(messages) {
  const systemPrompt = `Você é o assistente de IA da plataforma Agro Tech, especializado em agricultura, pecuária, agronomia e tecnologia do campo no Brasil. Responda sempre em português brasileiro de forma clara, didática e precisa. Use exemplos práticos quando possível. Se não tiver certeza de algo, diga claramente. Formate suas respostas de forma organizada, usando listas quando apropriado. Seja consultivo e empático com produtores rurais de todos os níveis de experiência.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': state.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.map(b => b.type === 'text' ? b.text : '').join('') || '';
  if (!text) throw new Error('Resposta vazia da API.');
  return text;
}

function getErrorMessage(err) {
  const msg = err.message || '';
  if (msg.includes('401') || msg.includes('authentication')) return 'Chave de API inválida. Verifique suas credenciais.';
  if (msg.includes('429') || msg.includes('rate')) return 'Limite de requisições atingido. Aguarde um momento.';
  if (msg.includes('500')) return 'Erro interno do servidor. Tente novamente.';
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) return 'Sem conexão com a internet.';
  return msg || 'Erro desconhecido. Tente novamente.';
}

// ─── DOM: MESSAGES ────────────────────────────────────────
function appendUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  messagesEl.appendChild(div);
  scrollBottom();
}

function appendAIMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.innerHTML = `
    <div class="msg-ai-header">
      <div class="ai-avatar">🌿</div>
      <span class="ai-name">Agro Tech IA</span>
    </div>
    <div class="bubble">${markdownToHtml(text)}</div>
    <div class="msg-ai-actions">
      <button class="action-btn" onclick="copyText(this, ${JSON.stringify(text)})">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Copiar
      </button>
    </div>
  `;
  messagesEl.appendChild(div);
  scrollBottom();
}

function showTyping() {
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'msg msg-ai';
  div.id = id;
  div.innerHTML = `
    <div class="msg-ai-header">
      <div class="ai-avatar">🌿</div>
      <span class="ai-name">Agro Tech IA</span>
    </div>
    <div class="bubble">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>
  `;
  messagesEl.appendChild(div);
  scrollBottom();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ─── UTILS ───────────────────────────────────────────────
function scrollBottom() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

function autoResize() {
  queryInput.style.height = 'auto';
  queryInput.style.height = Math.min(queryInput.scrollHeight, 160) + 'px';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function markdownToHtml(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // code blocks
    .replace(/```[\s\S]*?```/g, m => `<pre style="background:var(--bg-3);border-radius:8px;padding:12px 16px;overflow-x:auto;font-size:13px;margin:10px 0"><code>${m.slice(3, -3).replace(/^[\w]*\n/, '')}</code></pre>`)
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // headers
    .replace(/^### (.+)$/gm, '<h3 style="font-size:15px;font-weight:600;margin:14px 0 6px;color:var(--green-800)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:17px;font-weight:600;margin:16px 0 8px;color:var(--green-800)">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:19px;font-weight:700;margin:16px 0 8px;">$1</h1>')
    // unordered list
    .replace(/^\s*[-*•] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)
    // numbered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // horizontal rule
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:16px 0">')
    // paragraphs: split on blank lines
    .split(/\n{2,}/).map(chunk => {
      chunk = chunk.trim();
      if (!chunk) return '';
      if (/^<(h[1-3]|ul|ol|pre|hr)/.test(chunk)) return chunk;
      return `<p>${chunk.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');
}

function copyText(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg> Copiado!`;
    setTimeout(() => {
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg> Copiar`;
    }, 2000);
  });
}

function showToast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2700);
}

// ─── START ────────────────────────────────────────────────
init();