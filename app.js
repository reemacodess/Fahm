/**
 * Fahm (فَهم) Core Application
 * Router, State Management, and Firebase Sync
 */

const FahmApp = {
  currentRoute: 'dashboard',
  currentParam: null,

  async init() {
    // Initialize Data Service (Firebase or Local)
    if (window.FahmDataService) {
      await window.FahmDataService.init();
    }

    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  },

  async handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    const parts = hash.split('/');
    this.currentRoute = parts[0];
    this.currentParam = parts[1] || null;

    // Render Sidebar
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = renderSidebar(this.currentRoute);
    }

    // Render Main Content
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
      <div class="flex items-center justify-center p-16">
        <div class="w-8 h-8 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    `;

    try {
      if (this.currentRoute === 'dashboard') {
        mainContent.innerHTML = await DashboardPage.render();
      } else if (this.currentRoute === 'inbox') {
        mainContent.innerHTML = await InboxPage.render();
      } else if (this.currentRoute === 'details' && this.currentParam) {
        mainContent.innerHTML = await DetailsPage.render(this.currentParam);
      } else if (this.currentRoute === 'knowledge-base') {
        mainContent.innerHTML = await KnowledgePage.render();
      } else if (this.currentRoute === 'analytics') {
        mainContent.innerHTML = await AnalyticsPage.render();
      } else {
        window.location.hash = '#dashboard';
      }
    } catch (err) {
      console.error("Routing error:", err);
      mainContent.innerHTML = `
        <div class="bg-white rounded-2xl p-8 text-center text-[#ba1a1a] border border-[#ffdad6]">
          <span class="material-symbols-outlined text-4xl mb-2">error</span>
          <h3 class="font-bold text-lg">حدث خطأ أثناء تحميل الصفحة</h3>
          <p class="text-xs text-[#737685] mt-1">${err.message}</p>
        </div>
      `;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  navigate(route, param = null) {
    if (param) {
      window.location.hash = `#${route}/${param}`;
    } else {
      window.location.hash = `#${route}`;
    }
  },

  // 1. Approve Resolution
  async handleApprove(complaintId) {
    try {
      const result = await FahmDataService.approveComplaint(complaintId);
      if (result && result.success !== false) {
        ModalManager.showToast('تم اعتماد الحل المقترح وإغلاق الشكوى بنجاح!', 'success');
        this.handleRouting();
      } else {
        ModalManager.showToast(result.error || 'فشل اعتماد الحل', 'error');
      }
    } catch (e) {
      ModalManager.showToast('حدث خطأ أثناء معالجة الطلب', 'error');
    }
  },

  // 2. Edit Resolution
  async handleEditSubmit(complaintId) {
    const textarea = document.getElementById('edit-resolution-textarea');
    if (!textarea) return;
    const resolution = textarea.value.trim();
    if (!resolution) {
      alert('يرجى كتابة نص الحل');
      return;
    }

    try {
      const result = await FahmDataService.editComplaint(complaintId, resolution);
      if (result && result.success !== false) {
        ModalManager.closeModal();
        ModalManager.showToast('تم تعديل الحل المقترح واعتماده بنجاح!', 'success');
        this.handleRouting();
      } else {
        ModalManager.showToast(result.error || 'فشل تعديل الحل', 'error');
      }
    } catch (e) {
      ModalManager.showToast('حدث خطأ أثناء حفظ التعديل', 'error');
    }
  },

  // 3. Escalate Complaint
  async handleEscalateSubmit(complaintId) {
    const select = document.getElementById('escalate-reason-select');
    const notesText = document.getElementById('escalate-notes-textarea');
    const reason = select ? select.value : 'حالة استثنائية';
    const notes = notesText ? notesText.value : '';
    const fullReason = notes ? `${reason} (${notes})` : reason;

    try {
      const result = await FahmDataService.escalateComplaint(complaintId, fullReason);
      if (result && result.success !== false) {
        ModalManager.closeModal();
        ModalManager.showToast('تم تصعيد الشكوى إلى الفريق الإشرافي بنجاح.', 'info');
        this.handleRouting();
      } else {
        ModalManager.showToast(result.error || 'فشل تصعيد الشكوى', 'error');
      }
    } catch (e) {
      ModalManager.showToast('حدث خطأ أثناء تصعيد الشكوى', 'error');
    }
  },

  // Reset Demo Data
  async resetDemoData() {
    if (!confirm('هل ترغب في إعادة ضبط جميع الشكاوى والإحصائيات إلى حالتها التجريبية الافتراضية؟')) {
      return;
    }
    try {
      const result = await FahmDataService.resetDemoData();
      if (result && result.success !== false) {
        ModalManager.showToast('تمت إعادة ضبط البيانات بنجاح!', 'success');
        this.handleRouting();
      }
    } catch (e) {
      ModalManager.showToast('تعذر إعادة ضبط البيانات', 'error');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FahmApp.init();
});
