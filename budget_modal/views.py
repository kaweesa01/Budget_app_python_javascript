from django.shortcuts import render
from django.http import JsonResponse
import json
import datetime
from .models import Budget_table

# Create your views here.

def Budget_data():
    
    date_instance = datetime.datetime.now()
    
    date = f'{date_instance.strftime("%B")} {date_instance.strftime("%Y")}'
    
    Incomes = [{"id":item.id,"type": item.budget_type, "income": item.income,"description":item.description} for item in Budget_table.objects.filter(budget_type='inc')]
    Expenses = [{"id":item.id,"type": item.budget_type, "expense": item.expense,"description":item.description} for item in Budget_table.objects.filter(budget_type='exp')]
    
    total_income = sum([inc['income'] for inc in Incomes])
    total_expense = sum([exp['expense'] for exp in Expenses])
    
    try:
        expense_percentage = ( (total_expense / total_income) * 100 )   
    except :
        expense_percentage = 0
        
    context = {
        "date": date,
        "total_income": total_income,
        "remaining_income":( total_income - total_expense),
        "total_expense": total_expense,
        "Incomes": Incomes,
        "Expenses": Expenses,
        "expense_percentage": expense_percentage ,
    }
    
    return context
    

def Display_budget_app(request):
 
    return render(request, 'index.html',{})


def Display_data(request):
    
    budget_data = Budget_data()
    
    return JsonResponse({"data": budget_data }, safe=True)


def Add_budget(request):
    
    data = json.loads(request.body)
    
    if(data['Type'] == 'inc'):
        Budget_table.objects.create(
            budget_type=data['Type'],
            income=data['value'],
            description=data['description']
        )
    elif(data['Type'] == 'exp'):
        Budget_table.objects.create(
            budget_type=data['Type'],
            expense=data['value'],
            description=data['description']
        )
    
    budget_data = Budget_data()
    
    return JsonResponse({"data": budget_data }, safe = True)


def Delete_item(request, id):
    
    Budget_table.objects.filter(id=id).delete()
    
    budget_data = Budget_data()
    
    return JsonResponse({"data": budget_data }, safe = True)