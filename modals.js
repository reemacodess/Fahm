/**
 * Modals and Toast Notifications Component for Fahm (فَهم)
 */

const ModalManager = {
  activeModal: null,

  showEditModal(complaintId, currentResolution) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in-up">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-modal border border-[#e2e8f0]" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#f1f5f9]">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-[#eff4ff] text-[#0052cc] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">edit_note</span>
              </div>
              <h3 class="text-lg font-bold text-[#0b1c30]">تعديل الحل المقترح</h3>
            </div>
            <button onclick="ModalManager.closeModal()" class="text-[#737685] hover:text-[#ba1a1a] p-1 rounded-lg">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <p class="text-xs text-[#737685] mb-3">
            يمكنك تخصيص صياغة الحل أو إضافة تفاصيل قبل اعتماده رسمياً وإغلاق التذكرة:
          </p>

          <textarea id="edit-resolution-textarea" rows="4" 
            class="w-full p-3.5 rounded-xl border border-[#cbd5e1] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 outline-none text-sm text-[#0b1c30] leading-relaxed transition-all resize-none mb-4"
            placeholder="اكتب الحل المعتمد هنا...">${currentResolution || ''}</textarea>

          <div class="flex justify-end items-center gap-3">
            <button onclick="ModalManager.closeModal()" 
                    class="px-5 py-2.5 rounded-xl border border-[#cbd5e1] text-[#434654] hover:bg-[#f8f9ff] text-sm font-semibold transition-colors">
              إلغاء
            </button>
            <button onclick="FahmApp.handleEditSubmit(${complaintId})" 
                    class="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003d9b] text-white text-sm font-bold shadow-sm flex items-center gap-2 btn-interactive">
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
              <span>حفظ واعتماد الحل</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  showEscalateModal(complaintId) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in-up">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-modal border border-[#e2e8f0]" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-[#f1f5f9]">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">flag</span>
              </div>
              <h3 class="text-lg font-bold text-[#ba1a1a]">تصعيد الشكوى</h3>
            </div>
            <button onclick="ModalManager.closeModal()" class="text-[#737685] hover:text-[#ba1a1a] p-1 rounded-lg">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <p class="text-xs text-[#737685] mb-3">
            يرجى تحديد سبب التصعيد والمستوى الإشرافي المطلوب للتعامل مع هذه الحالة الاستثنائية:
          </p>

          <select id="escalate-reason-select" class="w-full p-3 rounded-xl border border-[#cbd5e1] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 outline-none text-sm text-[#0b1c30] mb-3 bg-white">
            <option value="حالة خاصة خارج الصلاحيات المعتمدة">حالة خاصة خارج الصلاحيات المعتمدة</option>
            <option value="نزاع مالي أو خطأ مصرفي متكرر">نزاع مالي أو خطأ مصرفي متكرر</option>
            <option value="تلف متكرر يتطلب مراجعة إدارة الجودة">تلف متكرر يتطلب مراجعة إدارة الجودة</option>
            <option value="عميل مميز / VIP يطلب تدخلاً إدارياً">عميل مميز / VIP يطلب تدخلاً إدارياً</option>
          </select>

          <textarea id="escalate-notes-textarea" rows="2" 
            class="w-full p-3 rounded-xl border border-[#cbd5e1] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 outline-none text-sm text-[#0b1c30] resize-none mb-4"
            placeholder="ملاحظات توجيهية إضافية للمشرف (اختياري)..."></textarea>

          <div class="flex justify-end items-center gap-3">
            <button onclick="ModalManager.closeModal()" 
                    class="px-5 py-2.5 rounded-xl border border-[#cbd5e1] text-[#434654] hover:bg-[#f8f9ff] text-sm font-semibold transition-colors">
              إلغاء
            </button>
            <button onclick="FahmApp.handleEscalateSubmit(${complaintId})" 
                    class="px-6 py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-sm font-bold shadow-sm flex items-center gap-2 btn-interactive">
              <span class="material-symbols-outlined text-[18px]">send</span>
              <span>تأكيد التصعيد</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  closeModal() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = '';
    }
  },

  showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const isSuccess = type === 'success';
    const isError = type === 'error';
    const isInfo = type === 'info';

    const bgClass = isSuccess ? 'bg-[#137333] text-white' : isError ? 'bg-[#ba1a1a] text-white' : 'bg-[#0052cc] text-white';
    const icon = isSuccess ? 'check_circle' : isError ? 'error' : 'info';

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="flex items-center gap-3 px-5 py-3 rounded-xl shadow-level-2 ${bgClass} animate-fade-in-up transition-all mb-2">
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <span class="text-sm font-bold">${message}</span>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);

    setTimeout(() => {
      const el = document.getElementById(toastId);
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-10px)';
        setTimeout(() => el.remove(), 300);
      }
    }, 3500);
  }
};
