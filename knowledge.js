/**
 * Screen 4: Knowledge Base Page (قاعدة المعرفة)
 * Matches Stitch _5/code.html with categories, approved solutions, and live usage counters
 */

const KnowledgePage = {
  currentCategory: 'all',
  searchQuery: '',

  async render() {
    const items = await FahmDataService.getKnowledgeBase(this.searchQuery, this.currentCategory);

    const categories = [
      { id: 'all', label: 'جميع الفئات' },
      { id: 'تأخر الطلب', label: 'تأخر الطلب' },
      { id: 'مشاكل الدفع', label: 'مشاكل الدفع' },
      { id: 'الاسترجاع والتبديل', label: 'الاسترجاع والتبديل' },
      { id: 'تلف المنتج', label: 'تلف المنتج' },
      { id: 'العروض والخصومات', label: 'العروض والخصومات' }
    ];

    return `
      <div class="space-y-6 animate-fade-in-up">
        <!-- Header & Search -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-[#0b1c30] tracking-tight">قاعدة المعرفة</h1>
            <p class="text-sm text-[#737685] mt-0.5">استعرض الحلول المعتمدة لتسريع معالجة الشكاوى وضمان جودة الردود</p>
          </div>
          <div class="relative w-full md:w-80 group">
            <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737685] group-focus-within:text-[#0052cc] transition-colors text-[20px]">search</span>
            <input 
              id="knowledge-search-input"
              type="text" 
              value="${this.searchQuery}"
              oninput="KnowledgePage.handleSearch(this.value)"
              placeholder="ابحث في قاعدة المعرفة والحلول..."
              class="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#cbd5e1] bg-white focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 outline-none text-sm text-[#0b1c30] placeholder:text-[#737685] transition-all shadow-xs"
            />
          </div>
        </div>

        <!-- Categories Filters -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          ${categories.map(cat => {
            const isActive = this.currentCategory === cat.id;
            return `
              <button 
                onclick="KnowledgePage.setCategory('${cat.id}')"
                class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-[#0052cc] text-white shadow-sm' 
                    : 'bg-white border border-[#e2e8f0] text-[#434654] hover:bg-[#eff4ff] hover:text-[#0052cc]'
                }">
                ${cat.label}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Knowledge Cards Grid -->
        ${items.length === 0 ? `
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center shadow-level-1">
            <span class="material-symbols-outlined text-[#737685] text-5xl mb-3">menu_book</span>
            <h3 class="text-base font-bold text-[#0b1c30]">لا توجد حلول مطابقة</h3>
            <p class="text-xs text-[#737685] mt-1">جرب البحث بكلمات أخرى أو اختر فئة مختلفة.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${items.map(item => `
              <div class="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-level-1 card-hover flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0052cc] flex items-center justify-center font-bold">
                        <span class="material-symbols-outlined text-[22px]">${item.icon || 'menu_book'}</span>
                      </div>
                      <div>
                        <h3 class="text-base font-bold text-[#0b1c30]">${item.category}</h3>
                        <span class="text-xs text-[#737685]">${item.title}</span>
                      </div>
                    </div>
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f5f3ff] text-[#510ebb] text-xs font-bold border border-[#d3e4fe]">
                      <span class="material-symbols-outlined text-[14px] sparkle-icon">auto_awesome</span>
                      حل معتمد
                    </span>
                  </div>

                  <div class="mt-4 pt-3 border-t border-[#f1f5f9]">
                    <span class="text-xs font-bold text-[#737685] block mb-1.5">الإجراء القياسي المعتمد:</span>
                    <p class="text-sm text-[#0b1c30] bg-[#f8f9ff] p-3.5 rounded-xl border border-[#e2e8f0] leading-relaxed font-medium">
                      ${item.approved_solution}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-5 pt-3 border-t border-[#f1f5f9] text-xs">
                  <div class="flex items-center gap-1.5 text-[#737685]">
                    <span class="material-symbols-outlined text-[18px]">history</span>
                    <span class="font-semibold">${item.total_cases || 100} حالة تاريخية</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-[#137333] font-bold bg-[#e6f4ea] px-3 py-1 rounded-full">
                    <span class="material-symbols-outlined text-[16px]">done_all</span>
                    <span>استُخدم ${item.usage_count || 0} مرة</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  setCategory(catId) {
    this.currentCategory = catId;
    FahmApp.navigate('knowledge-base');
  },

  handleSearch(query) {
    this.searchQuery = query;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      FahmApp.navigate('knowledge-base');
    }, 250);
  }
};
