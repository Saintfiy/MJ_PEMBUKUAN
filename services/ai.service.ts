import { CashflowPrediction } from '@/types';

export const aiService = {
  async analyzeFinancialHealth(stats: {
    totalIncome: number;
    totalExpense: number;
    cashBalance: number;
    inventory: number;
  }) {
    // Mock AI analysis - in production, use ML models
    const expenseRatio = stats.totalIncome > 0 ? stats.totalExpense / stats.totalIncome : 0;
    const cashFlowHealth = stats.cashBalance > stats.totalExpense * 2 ? 'healthy' : 'critical';

    const recommendations = [];

    if (expenseRatio > 0.8) {
      recommendations.push({
        type: 'cost-reduction',
        severity: 'high',
        message: 'Expenses are consuming more than 80% of income. Consider reducing operational costs.',
        savings: stats.totalExpense * 0.15,
      });
    }

    if (stats.inventory > stats.totalIncome * 0.5) {
      recommendations.push({
        type: 'inventory',
        severity: 'medium',
        message: 'Inventory value is high relative to monthly income. Consider optimizing stock levels.',
        savings: stats.inventory * 0.1,
      });
    }

    if (cashFlowHealth === 'critical') {
      recommendations.push({
        type: 'cash-flow',
        severity: 'critical',
        message: 'Cash reserve is low. Ensure sufficient liquidity for operations.',
      });
    }

    return {
      healthScore: Math.max(0, 100 - (expenseRatio > 1 ? 100 : expenseRatio * 100 / 2)),
      cashFlowHealth,
      recommendations,
    };
  },

  async predictCashflow(
    historicalData: any[],
    futureMonths: number = 3
  ): Promise<CashflowPrediction[]> {
    // Mock ML-based cashflow prediction
    const predictions: CashflowPrediction[] = [];
    const avgMonthlyIncome = historicalData.reduce((sum, d) => {
      return sum + (d.type === 'income' ? d.amount : 0);
    }, 0) / Math.max(1, historicalData.length);
    
    const avgMonthlyExpense = historicalData.reduce((sum, d) => {
      return sum + (d.type === 'expense' ? d.amount : 0);
    }, 0) / Math.max(1, historicalData.length);

    let projectedBalance = 0;

    for (let i = 0; i < futureMonths; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + i + 1);
      
      projectedBalance += avgMonthlyIncome - avgMonthlyExpense;

      predictions.push({
        date: date.toISOString().split('T')[0],
        projected_income: avgMonthlyIncome * (1 + Math.random() * 0.1 - 0.05),
        projected_expense: avgMonthlyExpense * (1 + Math.random() * 0.1 - 0.05),
        projected_balance: projectedBalance,
      });
    }

    return predictions;
  },

  async getProductInsights(_businessId: string, transactions: any[]) {
    // Mock product/category analysis
    const categoryMap = new Map();

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        const current = categoryMap.get(tx.category) || { revenue: 0, count: 0 };
        categoryMap.set(tx.category, {
          revenue: current.revenue + tx.amount,
          count: current.count + 1,
        });
      }
    });

    const topProducts = Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        revenue: data.revenue,
        transactions: data.count,
        avgValue: data.revenue / data.count,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    return {
      topProducts,
      marginAnalysis: topProducts.map((product) => ({
        ...product,
        profitMargin: Math.random() * 50 + 25, // Mock margin
      })),
    };
  },

  async generateExpenseSavingsTips(expenses: any[]) {
    const tips = [];

    // Categorize expenses
    const categories = new Map();
    expenses.forEach((exp) => {
      const current = categories.get(exp.category) || 0;
      categories.set(exp.category, current + exp.amount);
    });

    // Generate tips based on categories
    const sortedCategories = Array.from(categories.entries())
      .sort((a, b) => b[1] - a[1]);

    if (sortedCategories[0] && sortedCategories[0][1] > 0) {
      tips.push({
        category: sortedCategories[0][0],
        recommendation: `Your highest expense is in ${sortedCategories[0][0]}. Review contracts and negotiate better rates.`,
        potentialSavings: sortedCategories[0][1] * 0.1,
      });
    }

    tips.push({
      category: 'general',
      recommendation: 'Track all expenses daily to identify unusual spending patterns.',
      potentialSavings: 0,
    });

    return tips;
  },

  async generateBudgetOptimizations(budgets: any[], actual: any[]) {
    // Mock budget optimization suggestions
    return budgets.map((budget) => {
      const actualSpent = actual.find((a) => a.category === budget.category)?.amount || 0;
      const variance = budget.limit - actualSpent;

      return {
        category: budget.category,
        budgeted: budget.limit,
        actual: actualSpent,
        variance,
        recommendation:
          variance < 0
            ? `You have exceeded budget for ${budget.category} by ${Math.abs(variance)}. Consider reallocating resources.`
            : `You are under budget for ${budget.category}. Consider allocating the remaining ${variance} to priority areas.`,
      };
    });
  },
};
