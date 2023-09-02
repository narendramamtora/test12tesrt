const Expense = require('../models/expense');


exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then(expenses => {
      res.status(200).json(expenses); // Send the expenses in JSON format
    })
    .catch(err => {
      res.status(500).json({ message: 'Fetching failed.' });
    });
};

exports.getAddExpense = (req, res, next) => {
    res.render('expense/edit-expense', {
      pageTitle: 'Add Expense',
      path: '/add-expense',
      editing: false
      
    });
  };
  
  exports.postAddExpense = (req, res, next) => {
    const expAmount = req.body.expense; 
    const description = req.body.descrip; 
    const select = req.body.mselect; 
    console.log(req.body);
    Expense.create({
        expamount: expAmount,
        description: description,
        select: select
    })
    .then(result => {
        console.log('Created expense:', result);
        res.status(201).json(result); 
    })
    .catch(err => {
        console.error('Error creating expense:', err);
    });
}


  exports.getEditExpense = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/expense');
    }
    const useId = req.params.expeId;
    Expense.findByPk(useId)
    .then(expense => {
      if (!expense) {
        return res.redirect('/expense');
      }
      res.render('expense/edit-expense', {
        pageTitle: 'Edit Expense',
        path: '/edit-expense',
        editing: editMode,
        expense: expense
      });
    })
    .catch(err=>console.log(err))
  };
  
  exports.postEditExpense = (req, res, next) => {
    const useId = req.body.expeId;
    const updatedExp = exports.postEditExpense = (req, res, next) => {
      const useId = req.body.expeId;
      const updatedExp = req.body.expense; 
      const updatedDes =  req.body.descrip;
      const updatedSele =  req.body.mselect;
      Expense.findByPk(useId)
      .then(expense=>{
        expense.expamount=updatedExp;
        expense.description=updatedDes;
        expense.select=updatedSele;
        return expense.save();
      })
      .then(result=>console.log('update '))
      .catch(err=>console.log(err))
        res.redirect('/expense');// here if we have to click on the reload to see the changes then we should move this line to then block under the result  or we can keep it under the catch 
    };
    const updatedDes =  req.body.description;
    const updatedSele =  req.body.select;
    Expense.findByPk(useId)
    .then(expense=>{
      expense.expamount=updatedExp;
      expense.descrip=updatedDes;
      expense.mselect=updatedSele;
      return expense.save();
    })
    .then(result=>console.log('update '))
    .catch(err=>console.log(err))
      res.redirect('/expense');// here if we have to click on the reload to see the changes then we should move this line to then block under the result  or we can keep it under the catch 
  };
  
  exports.getExpenses = (req, res, next) => {
    Expense.findAll()
      .then(expenses => {
        res.render('expense', {
          prods: expenses,
          pageTitle: 'All Expenses',
          path: '/expenses'
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postDeleteExpense = (req, res, next) => {
    const expeId = req.params.expeId; // Use req.params.expeId
    Expense.findByPk(expeId)
      .then(expense => {
        if (!expense) {
          return res.status(404).json({ message: ' not found.' });
        }
        return expense.destroy();
      })
      .then(result => {
        console.log('deleted successfully');
        res.status(200).json({ message: 'deleted successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to delete' });
      });
  };
  