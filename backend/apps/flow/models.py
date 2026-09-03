from django.db import models
from django.utils import timezone
from core.models import TenantBaseModel

class InactivityCase(TenantBaseModel):
    RISK_TIERS = [
        ('tier_1', '10–14 Days (Early Risk)'),
        ('tier_2', '15–21 Days (Moderate Risk)'),
        ('tier_3', '22+ Days (Critical Churn Danger)'),
    ]

    member_id = models.CharField(max_length=64, db_index=True)
    member_name = models.CharField(max_length=255)
    member_phone = models.CharField(max_length=32)
    plan_name = models.CharField(max_length=128)
    days_absent = models.PositiveIntegerField(db_index=True)
    risk_tier = models.CharField(max_length=16, choices=RISK_TIERS, default='tier_1', db_index=True)
    potential_revenue_loss = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Staff Anti-Collision Protocol
    locked_by_staff_id = models.CharField(max_length=64, null=True, blank=True)
    locked_by_staff_name = models.CharField(max_length=128, null=True, blank=True)
    locked_at = models.DateTimeField(null=True, blank=True)
    lock_expires_at = models.DateTimeField(null=True, blank=True)

    is_resolved = models.BooleanField(default=False, db_index=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def is_locked(self) -> bool:
        if self.lock_expires_at and timezone.now() < self.lock_expires_at:
            return True
        return False

    def acquire_lock(self, staff_id: str, staff_name: str, duration_minutes: int = 15):
        self.locked_by_staff_id = staff_id
        self.locked_by_staff_name = staff_name
        self.locked_at = timezone.now()
        self.lock_expires_at = timezone.now() + timezone.timedelta(minutes=duration_minutes)
        self.save(update_fields=['locked_by_staff_id', 'locked_by_staff_name', 'locked_at', 'lock_expires_at'])


class RetentionOutcome(TenantBaseModel):
    CHANNELS = [
        ('whatsapp', '1-Tap WhatsApp Deep-Link'),
        ('phone_call', 'Direct Phone Call'),
        ('in_person', 'Front-Desk Discussion'),
    ]

    OUTCOME_STATUSES = [
        ('returning_soon', 'Will return this week'),
        ('travelling', 'Travelling (Frozen Pass)'),
        ('injured', 'Injured / Medical Recovery'),
        ('dropping_out', 'Considering dropping out (Offered coach review)'),
        ('no_response', 'Unreachable / Left voicemail'),
    ]

    case = models.ForeignKey(InactivityCase, on_delete=models.CASCADE, related_name='outcomes')
    staff_id = models.CharField(max_length=64)
    staff_name = models.CharField(max_length=128)
    channel = models.CharField(max_length=16, choices=CHANNELS, default='whatsapp')
    status = models.CharField(max_length=32, choices=OUTCOME_STATUSES)
    internal_notes = models.TextField(blank=True)
    next_follow_up_at = models.DateTimeField(null=True, blank=True)
