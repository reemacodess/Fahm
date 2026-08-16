"""
AI Service Architecture for Fahm (فَهم) Platform

This module defines the abstract AI Service Interface and its Deterministic Mock Provider.
In the future, a Real LLM Provider (e.g. Google Gemini / OpenAI) can be plugged in by implementing
the `AIServiceInterface` class without altering any UI, database, or API logic.
"""
from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional

class AIServiceInterface(ABC):
    """
    Standard Abstract Interface for Fahm AI Engine.
    All AI providers (Mock, Gemini, Anthropic, Custom LLM) must implement these methods.
    """

    @abstractmethod
    def analyze_complaint(self, text: str, customer_info: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Takes raw Arabic complaint text and returns a full structured analysis:
        - category: str (e.g. 'تأخر الطلب', 'مشاكل الدفع')
        - priority: str ('منخفضة', 'متوسطة', 'مرتفعة')
        - summary: str (Arabic 1-2 sentence summary)
        - confidence: int (Score e.g. 94)
        - suggested_resolution: str
        - reasoning: str (Evidence & stats)
        - similar_cases: List[Dict]
        """
        pass

    @abstractmethod
    def classify_complaint(self, text: str) -> str:
        """Classify complaint into standard business categories."""
        pass

    @abstractmethod
    def summarize_complaint(self, text: str) -> str:
        """Generate a concise Arabic summary."""
        pass

    @abstractmethod
    def detect_priority(self, text: str, category: str) -> str:
        """Determine priority level (منخفضة / متوسطة / مرتفعة)."""
        pass

    @abstractmethod
    def find_similar_cases(self, text: str, category: str) -> List[Dict[str, Any]]:
        """Retrieve top historical resolved cases."""
        pass

    @abstractmethod
    def recommend_resolution(self, text: str, category: str, similar_cases: List[Dict[str, Any]]) -> Dict[str, str]:
        """Generate recommended resolution and reasoning evidence."""
        pass


class DeterministicMockAIService(AIServiceInterface):
    """
    Deterministic & rule-enhanced Arabic Mock AI Provider for MVP.
    Provides realistic, accurate outputs for Arabic customer service complaints.
    """

    KNOWLEDGE_BASE_RULES = {
        "تأخر الطلب": {
            "keywords": ["تأخر", "لم يصل", "أسبوع", "الشحنة", "مكان طلبي", "موعد وصول", "تتبع", "مندوب", "توصيل", "عنوان"],
            "default_priority": "متوسطة",
            "resolution": "التحقق من حالة الشحنة باستخدام رقم الطلب، ثم إرسال آخر تحديث للعميل وموعد التسليم المتوقع.",
            "reasoning_template": "تم اقتراح هذا الحل بناءً على {count} حالة مشابهة تم حلها سابقاً، واستخدم هذا الإجراء بنجاح في {success} حالة.",
            "cases_count": 23,
            "success_count": 19,
            "sample_similar": [
                {
                    "historical_ticket_number": "#1023",
                    "similarity_score": 92,
                    "historical_summary": "العميل لم يستلم الطلب منذ 6 أيام.",
                    "applied_solution": "التحقق من الشحنة وإرسال موعد التسليم مع اعتذار لطيف.",
                    "resolved_ago": "قبل شهر"
                },
                {
                    "historical_ticket_number": "#0892",
                    "similarity_score": 88,
                    "historical_summary": "تأخر وصول الشحنة مع عدم وجود تحديث لرقم التتبع.",
                    "applied_solution": "متابعة شركة الشحن وإرسال رابط التتبع المحدث للعميل.",
                    "resolved_ago": "قبل شهرين"
                }
            ]
        },
        "مشاكل الدفع": {
            "keywords": ["خصم", "سحب", "مرتين", "بنك", "رصيد", "استرداد", "بطاقة", "فيزا", "مدى", "دفع", "فلوس"],
            "default_priority": "مرتفعة",
            "resolution": "التحقق من بوابة الدفع وتأكيد العملية المكررة، ثم إلغاء العملية الإضافية وإصدار استرداد فوري إلى حساب العميل البنكي.",
            "reasoning_template": "تم اقتراح هذا الحل بناءً على {count} حالة دفع مكرر سابقة، وتمت المعالجة بنجاح خلال 24 ساعة في {success}% من الحالات.",
            "cases_count": 31,
            "success_count": 97,
            "sample_similar": [
                {
                    "historical_ticket_number": "#2104",
                    "similarity_score": 96,
                    "historical_summary": "سحب مالي مزدوج لنفس الفاتورة من البطاقة الائتمانية.",
                    "applied_solution": "رفع طلب عكس عملية عبر بوابة الدفع وإرسال الإيصال للعميل.",
                    "resolved_ago": "قبل 3 أسابيع"
                }
            ]
        },
        "تلف المنتج": {
            "keywords": ["مكسور", "تالف", "كسر", "ممزق", "عيب", "خراب", "غير صالح", "مهشم"],
            "default_priority": "مرتفعة",
            "resolution": "اعتماد تعويض فوري وشحن منتج بديل مجاناً بدون انتظار استرجاع التالف، مع فتح بلاغ سوء مناولة لدى شركة الشحن.",
            "reasoning_template": "بناءً على {count} حالة تلف أثناء الشحن، شحن البديل الفوري يرفع رضا العملاء بنسبة {success}%.",
            "cases_count": 18,
            "success_count": 98,
            "sample_similar": [
                {
                    "historical_ticket_number": "#1950",
                    "similarity_score": 97,
                    "historical_summary": "استلام فازة زجاجية مهشمة داخل التغليف.",
                    "applied_solution": "شحن قطعة بديلة فوراً وتقديم مطالبة تأمين ضد شركة الشحن.",
                    "resolved_ago": "قبل شهر"
                }
            ]
        },
        "الاسترجاع والتبديل": {
            "keywords": ["استبدال", "استرجاع", "مقاس", "تبديل", "صغير", "كبير", "لون", "إرجاع"],
            "default_priority": "منخفضة",
            "resolution": "إنشاء بوليصة استبدال مجانية وإرسالها للعميلة مع توجيه مندوب الاستلام، وحجز المقاس الجديد فوراً.",
            "reasoning_template": "الحالة تقع ضمن سياسة الاستبدال المجاني. استُخدم هذا الإجراء في {count} حالة استبدال مطابقة.",
            "cases_count": 45,
            "success_count": 45,
            "sample_similar": [
                {
                    "historical_ticket_number": "#3042",
                    "similarity_score": 94,
                    "historical_summary": "طلب استبدال قطعة ملابس بمقاس أكبر بعد الاستلام بيوم.",
                    "applied_solution": "إصدار بوليصة إرجاع مجانية وحجز المنتج البديل للشحن.",
                    "resolved_ago": "قبل أسبوعين"
                }
            ]
        },
        "العروض والخصومات": {
            "keywords": ["كوبون", "خصم", "كود", "عرض", "سلة", "تخفيض", "ترويجي"],
            "default_priority": "منخفضة",
            "resolution": "تفعيل الكوبون يدوياً على سلة العميل أو إنشاء كود خصم مخصص بنسبة 20% وإرساله للعميل عبر البريد.",
            "reasoning_template": "تم حل {count} حالة مماثلة بنجاح عبر إصدار كود بديل فوري للمستخدم.",
            "cases_count": 29,
            "success_count": 29,
            "sample_similar": [
                {
                    "historical_ticket_number": "#2211",
                    "similarity_score": 90,
                    "historical_summary": "عطل في تطبيق كود خصم الحملة الإعلانية.",
                    "applied_solution": "إصدار قسيمة تعويضية بقيمة الخصم مباشرة في الحساب.",
                    "resolved_ago": "قبل شهر"
                }
            ]
        }
    }

    def classify_complaint(self, text: str) -> str:
        text_lower = text.lower()
        best_cat = "تأخر الطلب"
        max_matches = 0
        for cat, data in self.KNOWLEDGE_BASE_RULES.items():
            matches = sum(1 for kw in data["keywords"] if kw in text_lower)
            if matches > max_matches:
                max_matches = matches
                best_cat = cat
        return best_cat

    def summarize_complaint(self, text: str) -> str:
        category = self.classify_complaint(text)
        if category == "تأخر الطلب":
            return "العميل لم يستلم طلبه بعد مرور أسبوع ويرغب في معرفة حالة الشحنة وموعد وصولها."
        elif category == "مشاكل الدفع":
            return "خصم المبلغ مرتين من الحساب البنكي للعميل عند إتمام الطلب ومطالبة باسترداد فوري للمبلغ الزائد."
        elif category == "تلف المنتج":
            return "استلام منتج مكسور مع تلف في التغليف الخارجي للطلب وطلب شحن بديل سليم عاجل."
        elif category == "الاسترجاع والتبديل":
            return "العميلة ترغب في استبدال مقاس المنتج بآخر أكبر مجاناً بسبب عدم ملائمة المقاس."
        elif category == "العروض والخصومات":
            return "كوبون الخصم الترويجي لا يطبق في صفحة الدفع رغم استيفاء الشروط."
        return text[:100] + "..."

    def detect_priority(self, text: str, category: str) -> str:
        rule = self.KNOWLEDGE_BASE_RULES.get(category)
        if rule:
            return rule["default_priority"]
        return "متوسطة"

    def find_similar_cases(self, text: str, category: str) -> List[Dict[str, Any]]:
        rule = self.KNOWLEDGE_BASE_RULES.get(category, self.KNOWLEDGE_BASE_RULES["تأخر الطلب"])
        return rule["sample_similar"]

    def recommend_resolution(self, text: str, category: str, similar_cases: List[Dict[str, Any]]) -> Dict[str, str]:
        rule = self.KNOWLEDGE_BASE_RULES.get(category, self.KNOWLEDGE_BASE_RULES["تأخر الطلب"])
        reasoning = rule["reasoning_template"].format(
            count=rule["cases_count"],
            success=rule["success_count"]
        )
        return {
            "suggested_resolution": rule["resolution"],
            "ai_reasoning": reasoning
        }

    def analyze_complaint(self, text: str, customer_info: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        category = self.classify_complaint(text)
        priority = self.detect_priority(text, category)
        summary = self.summarize_complaint(text)
        similar_cases = self.find_similar_cases(text, category)
        recommendation = self.recommend_resolution(text, category, similar_cases)
        
        # Mock confidence score (90% - 98%)
        confidence_map = {
            "تأخر الطلب": 94,
            "مشاكل الدفع": 96,
            "تلف المنتج": 98,
            "الاسترجاع والتبديل": 91,
            "العروض والخصومات": 89
        }
        confidence = confidence_map.get(category, 92)

        return {
            "category": category,
            "priority": priority,
            "summary": summary,
            "confidence": confidence,
            "suggested_resolution": recommendation["suggested_resolution"],
            "reasoning": recommendation["ai_reasoning"],
            "similar_cases": similar_cases
        }


# Global AI Service Instance (Factory function pattern)
def get_ai_service() -> AIServiceInterface:
    """
    Factory function returning the active AI Service implementation.
    Swap `DeterministicMockAIService` with `GeminiAIService` when ready for production LLM.
    """
    return DeterministicMockAIService()
