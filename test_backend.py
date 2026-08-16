"""
Backend Verification Tests for Fahm (فَهم)
"""
import os
import sys

backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
sys.path.insert(0, backend_dir)

from database import (
    get_all_complaints,
    get_complaint_by_id,
    approve_complaint_resolution,
    edit_complaint_resolution,
    escalate_complaint,
    get_knowledge_base,
    get_analytics_and_stats
)
from ai_service import get_ai_service

def test_all():
    print("Testing Fahm Backend...")
    
    # 1. Test get complaints
    complaints = get_all_complaints()
    assert len(complaints) > 0, "Complaints list should not be empty"
    print(f"[PASS] Total complaints fetched: {len(complaints)}")
    
    # 2. Test get complaint by id #4829
    c1 = get_complaint_by_id(1)
    assert c1 is not None, "Complaint 1 must exist"
    assert c1["ticket_number"] == "#4829", f"Expected #4829, got {c1['ticket_number']}"
    assert len(c1["similar_cases"]) > 0, "Similar cases should be loaded"
    print(f"[PASS] Complaint #{c1['ticket_number']} details & {len(c1['similar_cases'])} similar cases verified")
    
    # 3. Test AI Service Mock
    ai = get_ai_service()
    ai_res = ai.analyze_complaint(c1["original_message"])
    assert ai_res["category"] == "تأخر الطلب"
    assert ai_res["confidence"] >= 90
    print(f"[PASS] AI Service simulated analysis: Category={ai_res['category']}, Confidence={ai_res['confidence']}%")
    
    # 4. Test Knowledge Base
    kb = get_knowledge_base()
    assert len(kb) > 0, "Knowledge base should have items"
    print(f"[PASS] Knowledge base items: {len(kb)}")
    
    # 5. Test Analytics
    stats = get_analytics_and_stats()
    assert "total_complaints" in stats
    assert "resolution_rate" in stats
    print(f"[PASS] Analytics and KPIs computed successfully: Resolution Rate = {stats['resolution_rate']}%")
    
    print("\nALL BACKEND & DATA TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_all()
