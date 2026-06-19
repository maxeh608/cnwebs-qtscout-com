// public/site-helper.js

(function() {
  'use strict';

  // 配置数据
  const SITE_URL = 'https://cnwebs-qtscout.com';
  const KEYWORD = '球探';
  const SEED = '6ff857d9e7f43fc4';

  // 页面提示卡片数据
  const tips = [
    { icon: 'ℹ️', title: '欢迎使用' + KEYWORD + '工具', text: '本站提供专业数据分析与趋势解读，帮助您快速掌握关键信息。' },
    { icon: '🔍', title: '关键词徽章', text: '页面中出现的核心关键词将以徽章形式高亮显示，便于识别。' },
    { icon: '📖', title: '访问说明', text: '首次访问请确认浏览器支持 JavaScript，并允许必要的页面渲染。' }
  ];

  // 创建提示卡片
  function createTipCards() {
    const container = document.createElement('div');
    container.className = 'site-helper-cards';
    container.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;margin:16px 0;';

    tips.forEach(function(tip) {
      const card = document.createElement('div');
      card.className = 'helper-card';
      card.style.cssText = 'background:#f9f9fb;border:1px solid #e0e0e0;border-radius:8px;padding:12px 16px;width:260px;box-shadow:0 2px 4px rgba(0,0,0,0.05);';
      
      const iconSpan = document.createElement('span');
      iconSpan.textContent = tip.icon;
      iconSpan.style.cssText = 'font-size:20px;margin-right:8px;';
      
      const titleStrong = document.createElement('strong');
      titleStrong.textContent = tip.title;
      titleStrong.style.cssText = 'font-size:15px;color:#333;';
      
      const textPara = document.createElement('p');
      textPara.textContent = tip.text;
      textPara.style.cssText = 'margin:8px 0 0;font-size:13px;color:#555;line-height:1.4;';
      
      card.appendChild(iconSpan);
      card.appendChild(titleStrong);
      card.appendChild(textPara);
      container.appendChild(card);
    });

    return container;
  }

  // 关键词徽章处理
  function addKeywordBadges() {
    const keyword = KEYWORD;
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentElement && 
              (node.parentElement.tagName === 'SCRIPT' || 
               node.parentElement.tagName === 'STYLE' ||
               node.parentElement.classList.contains('helper-card') ||
               node.parentElement.classList.contains('keyword-badge'))) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent.indexOf(keyword) !== -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach(function(textNode) {
      const parent = textNode.parentNode;
      const frag = document.createDocumentFragment();
      const parts = textNode.textContent.split(keyword);
      
      parts.forEach(function(part, index) {
        if (part) {
          frag.appendChild(document.createTextNode(part));
        }
        if (index < parts.length - 1) {
          const badge = document.createElement('span');
          badge.className = 'keyword-badge';
          badge.textContent = keyword;
          badge.style.cssText = 'display:inline-block;background:#ffecb3;color:#795548;border-radius:12px;padding:0 8px;font-size:0.9em;font-weight:600;margin:0 2px;border:1px solid #ffe082;';
          frag.appendChild(badge);
        }
      });
      
      parent.replaceChild(frag, textNode);
    });
  }

  // 访问说明区域
  function createAccessNotice() {
    const noticeDiv = document.createElement('div');
    noticeDiv.className = 'access-notice';
    noticeDiv.style.cssText = 'background:#e3f2fd;border-left:4px solid #1e88e5;padding:12px 16px;margin:16px 0;border-radius:4px;font-size:14px;color:#1565c0;';

    const titleSpan = document.createElement('strong');
    titleSpan.textContent = '访问说明：';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = '本站 ' + SITE_URL + ' 使用 JavaScript 增强交互体验。如遇显示异常，请尝试刷新页面或更新浏览器。关键词“' + KEYWORD + '”将自动标记为徽章。';
    
    noticeDiv.appendChild(titleSpan);
    noticeDiv.appendChild(textSpan);
    
    return noticeDiv;
  }

  // 初始化
  function init() {
    // 如果已经存在助手容器则跳过
    if (document.querySelector('.site-helper-cards')) return;

    const mainContent = document.querySelector('main') || document.querySelector('article') || document.querySelector('.content') || document.body;
    
    const cards = createTipCards();
    const notice = createAccessNotice();
    
    const wrapper = document.createElement('div');
    wrapper.className = 'site-helper-wrapper';
    wrapper.style.cssText = 'max-width:960px;margin:0 auto;padding:0 16px;';
    
    wrapper.appendChild(cards);
    wrapper.appendChild(notice);
    
    mainContent.insertBefore(wrapper, mainContent.firstChild);
    
    // 延迟执行关键词徽章，确保DOM就绪
    setTimeout(addKeywordBadges, 100);
  }

  // 在DOM完全加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();