/**
 * Screen 5: Analytics Page (التحليلات ومؤشرات الأداء)
 * Matches Stitch _6/code.html with key SaaS performance indicators
 */

const AnalyticsPage = {
  async render() {
    const stats = await FahmDataService.getStats();

    return `
      <div class="space-y-6 animate-fade-in-up">
        <!-- Header -->
        ${renderHeader(
          'نظرة عامة على الأداء',
          'مؤشرات الأداء الرئيسية والتحليلات الذكية لتسريع حل الشكاوى'
        )}

        <!-- 4 Key Metrics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Metric 1: Total Volume -->
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-level-1 card-hover">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold text-[#737685]">حجم الشكاوى المعالجة</span>
              <div class="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#0052cc] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
            </div>
            <span class="text-2xl font-bold text-[#0b1c30]">${stats.total_complaints ? stats.total_complaints.toLocaleString('ar-EG') : '1,240'}</span>
            <span class="text-xs text-[#137333] font-bold flex items-center mt-1">
              <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_upward</span> +12% هذا الشهر
            </span>
          </div>

          <!-- Metric 2: Repeated Complaints % -->
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-level-1 card-hover">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold text-[#737685]">نسبة الشكاوى المتكررة</span>
              <div class="w-8 h-8 rounded-xl bg-[#f5f3ff] text-[#6a36d3] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">repeat</span>
              </div>
            </div>
            <span class="text-2xl font-bold text-[#0b1c30]">${stats.repeated_complaints_rate || 68}%</span>
            <span class="text-xs text-[#510ebb] font-semibold block mt-1">تطابق حلول سابقة</span>
          </div>

          <!-- Metric 3: AI Assistance Rate -->
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-level-1 card-hover">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold text-[#737685]">نسبة مساعدة فَهم</span>
              <div class="w-8 h-8 rounded-xl bg-[#eff4ff] text-[#0052cc] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] sparkle-icon">auto_awesome</span>
              </div>
            </div>
            <span class="text-2xl font-bold text-[#0052cc]">${stats.ai_assisted_rate || 92}%</span>
            <span class="text-xs text-[#0052cc] font-bold block mt-1">تم حلها بمقترحات فَهم</span>
          </div>

          <!-- Metric 4: Avg Resolution Time -->
          <div class="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-level-1 card-hover">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold text-[#737685]">متوسط وقت الحل</span>
              <div class="w-8 h-8 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">speed</span>
              </div>
            </div>
            <span class="text-2xl font-bold text-[#137333]">${stats.avg_processing_time || '3.8 دقيقة'}</span>
            <span class="text-xs text-[#137333] font-bold block mt-1">وفر ${stats.time_saved || '64%'} من الوقت</span>
          </div>
        </div>

        <!-- Charts & Detailed Insights Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Category Breakdown Card (7 cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-level-1">
            <div class="flex justify-between items-center pb-3 mb-4 border-b border-[#f1f5f9]">
              <h3 class="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#0052cc] text-[20px]">bar_chart</span>
                توزيع الشكاوى حسب الفئة
              </h3>
              <span class="text-xs text-[#737685]">تحليل حجم المشاكل</span>
            </div>

            <div class="space-y-4 pt-2">
              ${(stats.top_categories || []).map(cat => `
                <div>
                  <div class="flex justify-between items-center text-xs mb-1.5 font-medium text-[#434654]">
                    <span class="font-bold text-[#0b1c30]">${cat.name}</span>
                    <span class="text-[#737685]">${cat.percentage}% من إجمالي الشكاوى</span>
                  </div>
                  <div class="w-full bg-[#f1f5f9] rounded-full h-3 overflow-hidden">
                    <div class="${cat.color} h-3 rounded-full transition-all duration-700" style="width: ${cat.percentage}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="mt-6 pt-4 border-t border-[#f1f5f9] grid grid-cols-2 gap-3 text-center">
              <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#e2e8f0]">
                <span class="text-xs text-[#737685] block mb-1">الفئة الأكثر تكراراً</span>
                <span class="text-sm font-bold text-[#0052cc]">تأخر الطلب (42%)</span>
              </div>
              <div class="bg-[#f8f9ff] p-3 rounded-xl border border-[#e2e8f0]">
                <span class="text-xs text-[#737685] block mb-1">أعلى معدل حل سريع</span>
                <span class="text-sm font-bold text-[#137333]">مشاكل الدفع (97%)</span>
              </div>
            </div>
          </div>

          <!-- Smart Insights Card (5 cols) -->
          <div class="lg:col-span-5 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-level-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 pb-3 mb-4 border-b border-[#f1f5f9]">
                <div class="w-8 h-8 rounded-full bg-[#f5f3ff] text-[#6a36d3] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[18px] sparkle-icon">auto_awesome</span>
                </div>
                <h3 class="text-base font-bold text-[#510ebb]">رؤى وتحليلات فَهم الذكية</h3>
              </div>

              <div class="space-y-3.5">
                <div class="flex items-start gap-3 bg-[#eff4ff] p-3.5 rounded-xl border border-[#d3e4fe]">
                  <span class="material-symbols-outlined text-[#0052cc] text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <p class="text-xs text-[#434654] leading-relaxed">
                    <strong>كفاءة التوصيات:</strong> اعتماد الموظفين للحل المقترح دون تعديل شكّل 86% من الحالات هذا الأسبوع.
                  </p>
                </div>

                <div class="flex items-start gap-3 bg-[#f5f3ff] p-3.5 rounded-xl border border-[#d0bcff]">
                  <span class="material-symbols-outlined text-[#6a36d3] text-[20px] shrink-0 mt-0.5">insights</span>
                  <p class="text-xs text-[#434654] leading-relaxed">
                    <strong>توفير الوقت:</strong> قلل البحث عن الحالات المشابهة وقت معالجة الشكوى الواحدة من 11 دقيقة إلى 3.8 دقيقة.
                  </p>
                </div>

                <div class="flex items-start gap-3 bg-[#fff7ed] p-3.5 rounded-xl border border-[#fed7aa]">
                  <span class="material-symbols-outlined text-[#ea580c] text-[20px] shrink-0 mt-0.5">lightbulb</span>
                  <p class="text-xs text-[#434654] leading-relaxed">
                    <strong>توصية وقائية:</strong> 42% من شكاوى التأخر ناتجة عن عدم تحديث رابط التتبع تلقائياً للمستخدمين.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-[#f1f5f9] flex justify-between items-center text-xs text-[#737685]">
              <span>المصدر: Firebase Cloud Firestore</span>
              <span class="text-[#0052cc] font-bold">متزامن سحابياً</span>
            </div>
          </div>

        </div>
      </div>
    `;
  }
};
