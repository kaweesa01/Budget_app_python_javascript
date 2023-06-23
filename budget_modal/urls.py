from django.urls import path

from .views import Display_budget_app, Add_budget, Delete_item, Display_data

urlpatterns = [
    path('', Display_budget_app),
    path('add_budget/', Add_budget),
    path('delete_item/<int:id>/', Delete_item),
    path('show_data/', Display_data),
]
