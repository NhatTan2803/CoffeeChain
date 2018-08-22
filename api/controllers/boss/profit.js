module.exports = {


  friendlyName: 'Profit',


  description: 'Profit boss.',


  inputs: {
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/coffee/Boss/report',
    }
  },


  fn: async function (inputs, exits) {
    const now = new Date();
    const todayIs = now.getDay();
    const firstday = new Date(now.getFullYear(), now.getMonth());
    const lastday = new Date(now.getFullYear(), now.getMonth() + 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - todayIs + 2);

    let allBillInMonth = await Bill.find(
      {
        createdAt:
          { '<=': lastday.valueOf(), '>=': firstday.valueOf() }
      }
    )

    let allBillToday = await Bill.find(
      {
        createdAt:
          { '<=': tomorrow.valueOf(), '>=': today.valueOf() }
      }
    )

    let allBillInWeek = await Bill.find(
      {
        createdAt:
          { '<=': tomorrow.valueOf(), '>=': monday.valueOf() }
      }
    )

    const monthRevenue = allBillInMonth.reduce((sum, bill) => {
      return sum + bill.total;
    }, 0)

    const todayRevenue = allBillToday.reduce((sum, bill) => {
      return sum + bill.total;
    }, 0)

    const weekRevenue = allBillInWeek.reduce((sum, bill) => {
      return sum + bill.total;
    }, 0)

    const countBill = allBillToday.reduce((count) => {
      return count + 1;
    }, 0)

    let billDetailToday = await BillDetail.find({
      createdAt:
        { '<=': tomorrow.valueOf(), '>=': today.valueOf() }
    });

    let countDrink = billDetailToday.reduce((drinks, detail) => {
      if (!drinks[detail.drinkName]) {
        drinks[detail.drinkName] = detail.quantity;
      }
      else {
        drinks[detail.drinkName] += detail.quantity;
      }
      return drinks;
    },{});
    return exits.success({ monthRevenue, todayRevenue, weekRevenue, countBill,countDrink, layout: 'layouts/layout-boss'});
  }
};
