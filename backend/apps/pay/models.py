from django.db import models
from core.models import TenantBaseModel

class MembershipOrder(TenantBaseModel):
    STATUS_CHOICES = [
        ('created', 'Created'),
        ('paid', 'Payment Verified & Pass Extended'),
        ('failed', 'Payment Failed'),
        ('refunded', 'Refunded'),
    ]

    order_id = models.CharField(max_length=128, unique=True, db_index=True)
    member_id = models.CharField(max_length=64, db_index=True)
    member_name = models.CharField(max_length=255)
    member_phone = models.CharField(max_length=32)
    plan_code = models.CharField(max_length=64)
    months_extended = models.PositiveIntegerField(default=1)

    base_amount = models.DecimalField(max_digits=10, decimal_places=2)
    gst_amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="18% CGST + SGST")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    payment_method = models.CharField(max_length=32, default='upi')
    payment_gateway_ref = models.CharField(max_length=128, null=True, blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='created', db_index=True)


class WebhookEvent(TenantBaseModel):
    """Guarantees idempotent payment webhook processing."""
    event_id = models.CharField(max_length=128, unique=True, db_index=True)
    gateway = models.CharField(max_length=32, default='razorpay')
    payload = models.JSONField()
    processed = models.BooleanField(default=False)
    processed_at = models.DateTimeField(null=True, blank=True)


class GSTInvoice(TenantBaseModel):
    invoice_number = models.CharField(max_length=64, unique=True, db_index=True)
    order = models.OneToOneField(MembershipOrder, on_delete=models.CASCADE, related_name='invoice')
    sac_code = models.CharField(max_length=16, default='999723', help_text="SAC 999723 Fitness Center Services")
    cgst_rate = models.DecimalField(max_digits=4, decimal_places=2, default=9.00)
    sgst_rate = models.DecimalField(max_digits=4, decimal_places=2, default=9.00)
    invoice_pdf_url = models.URLField(null=True, blank=True)
