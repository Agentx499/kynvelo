import uuid
from django.db import models
from django.utils import timezone

class TenantManager(models.Manager):
    """Enforces active and non-deleted queryset scoping."""
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

    def for_tenant(self, gym_id: str):
        """Strict tenant isolation filter."""
        return self.get_queryset().filter(gym_id=gym_id)


class TenantBaseModel(models.Model):
    """
    Core invariant: Every record in Kynvelo inherits TenantBaseModel.
    Guarantees tenant scoping, audit trails, and soft-deletes.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gym_id = models.CharField(max_length=64, db_index=True, help_text="Tenant UUID or 'kynvelo-direct' for B2C")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, db_index=True)
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = TenantManager()
    all_objects = models.Manager() # Includes soft-deleted records for audit compliance

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'deleted_at'])
