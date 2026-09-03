from django.db import models
from core.models import TenantBaseModel

class Exercise(TenantBaseModel):
    name = models.CharField(max_length=128)
    primary_muscle = models.CharField(max_length=64, help_text="e.g. Chest, Quads, Lats")
    secondary_muscles = models.CharField(max_length=128, blank=True)
    equipment = models.CharField(max_length=64, default='Barbell')
    form_cue = models.TextField(blank=True)


class Routine(TenantBaseModel):
    member_id = models.CharField(max_length=64, db_index=True)
    title = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    target_split = models.CharField(max_length=64, default='Push/Pull/Legs')


class WorkoutSession(TenantBaseModel):
    member_id = models.CharField(max_length=64, db_index=True)
    routine = models.ForeignKey(Routine, on_delete=models.SET_NULL, null=True, blank=True)
    duration_seconds = models.PositiveIntegerField(default=0)
    total_volume_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    completed_at = models.DateTimeField(null=True, blank=True)


class SetLog(TenantBaseModel):
    session = models.ForeignKey(WorkoutSession, on_delete=models.CASCADE, related_name='sets')
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    set_number = models.PositiveIntegerField()
    weight_kg = models.DecimalField(max_digits=6, decimal_places=2)
    reps = models.PositiveIntegerField()
    rpe = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    is_warmup = models.BooleanField(default=False)
    is_dropset = models.BooleanField(default=False)


class PersonalRecord(TenantBaseModel):
    member_id = models.CharField(max_length=64, db_index=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    one_rep_max_kg = models.DecimalField(max_digits=6, decimal_places=2)
    achieved_at = models.DateTimeField(auto_now_add=True)
