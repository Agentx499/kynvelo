import hmac
import hashlib
import time
from django.db import models
from core.models import TenantBaseModel

class TurnstileGate(TenantBaseModel):
    name = models.CharField(max_length=128, help_text="e.g. Main Turnstile 01")
    ip_address = models.GenericIPAddressField(help_text="Local TCP/IP relay controller IP")
    port = models.PositiveIntegerField(default=5000)
    relay_pin = models.PositiveIntegerField(default=1)
    pulse_duration_ms = models.PositiveIntegerField(default=300)
    is_online = models.BooleanField(default=True)
    last_heartbeat = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.gym_id})"


class CheckInRecord(TenantBaseModel):
    ENTRY_METHODS = [
        ('dynamic_qr', '15s Dynamic QR Code'),
        ('assisted_staff', 'Front-Desk Assisted Check-in'),
        ('nfc_card', 'NFC / RFID Card'),
        ('usb_barcode', 'USB Barcode Reader'),
    ]

    member_id = models.CharField(max_length=64, db_index=True)
    member_name = models.CharField(max_length=255)
    gate = models.ForeignKey(TurnstileGate, on_delete=models.SET_NULL, null=True, related_name='checkins')
    entry_method = models.CharField(max_length=32, choices=ENTRY_METHODS, default='dynamic_qr')
    verified_hmac = models.BooleanField(default=True)
    assisted_reason = models.CharField(max_length=255, null=True, blank=True, help_text="Mandatory if assisted_staff")
    staff_id = models.CharField(max_length=64, null=True, blank=True)
    offline_buffered = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['gym_id', 'member_id', 'created_at']),
        ]

    @staticmethod
    def verify_qr_token(member_id: str, secret_key: str, token: str, window_seconds: int = 15) -> bool:
        """
        Cryptographic time-bound HMAC verification.
        Validates current window and previous window to handle edge-of-second latency.
        """
        current_time = int(time.time())
        for offset in [0, -window_seconds]:
            time_window = (current_time + offset) // window_seconds
            message = f"{member_id}:{time_window}".encode('utf-8')
            expected = hmac.new(secret_key.encode('utf-8'), message, hashlib.sha256).hexdigest()[:16]
            if hmac.compare_digest(expected, token):
                return True
        return False
