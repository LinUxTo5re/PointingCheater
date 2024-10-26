# models.py

from django.db import models

class Feedback(models.Model):
    user_name = models.CharField(max_length=100)
    feedback_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_name
