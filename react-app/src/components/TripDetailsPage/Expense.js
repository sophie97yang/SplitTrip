import {useSelector} from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import AddExpenseForm from '../AddExpenseForm';
import { Link,useHistory } from 'react-router-dom';
import SettleUp from '../SettleUpModal';

const Expense = ({trip,group_balances,total_info}) => {
    const user = useSelector(state=>state.session.user);
    const history = useHistory();
    const user_expense_detail = {};
    //images to display depending on expense category
    const category_images = {
        "General":"https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png",
        "Transportation":"https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/transportation/other@2x.png",
        "Food and Drink":"https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/other@2x.png",
        "Entertainment":"https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/entertainment/other@2x.png"
    }
    //organize expenses by timeframe - year and month
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const expense_by_year = {}
    trip.trip.expenses.forEach(expense => {
        const year = new Date(expense.expense_date).getFullYear()
        const month = monthNames[new Date(expense.expense_date).getMonth()]
        if (!(year in expense_by_year)) {
            const expense_by_month = {}
            if (!(month in expense_by_month)) {
                expense_by_month[month]=[expense]
            } else {
                expense_by_month[month] = [...expense_by_month[month],expense]
            }
            expense_by_year[year] = expense_by_month
        } else {
            const yearly_expenses = expense_by_year[year]
            if (!(month in yearly_expenses)) {
                yearly_expenses[month]=[expense]
            } else {
                yearly_expenses[month] = [...yearly_expenses[month],expense]
             }
        }
        //filter out expense detail relavent to user
        user_expense_detail[expense.id]={...expense.details.filter(detail => detail.user.id===user.id)[0]}
        // console.log('before',user_expense_detail)
        if (user_expense_detail[expense.id].id){
             user_expense_detail[expense.id]['payer'] = expense.payer
        }
    })


    return (
        <div className='expense-overview'>
            <div className='expense-action-buttons'>
            {/* <OpenModalButton
                     buttonText="Add Expense"
                     modalComponent={<AddExpenseForm trip={trip}/>}
                     className={"add-expense-button"}
                 /> */}
             <button onClick={(e)=> {
                    e.preventDefault();
                    history.push(`/trips/${trip.id}/expenses/new`)
                 }}
                 className="add-expense-button">Add Expense</button>
            <OpenModalButton
                     buttonText="Settle Up"
                     //userExpenses: expenses that the user owes in the trip
                     //expensesOwn:expenses that the user has paid and owns
                     modalComponent={<SettleUp group_balances={group_balances} total_info={total_info} trip={trip} />}
                     className={"settle-up-button"}
                 />
            </div>

            {
                Object.keys(expense_by_year).sort((year1,year2)=> Number(year1)-Number(year2)).map(year => (
                    <div key={year} className='yearly_expenses'>
                        <h4 id="year-expense-detail">{year}</h4>
                        {
                             Object.keys(expense_by_year[year]).sort((month1,month2)=>monthNames.indexOf(month1)-monthNames.indexOf(month2)).map(month => (
                                <div key={month} className='monthly_expenses'>
                                <h4>{month.toUpperCase()}</h4>
                                {
                                    expense_by_year[year][month].sort((obj1,obj2)=>new Date(obj1.expense_date)- new Date(obj2.expense_date)).map(expense => (
                                        <div key={expense.id} className='expense-detail'>
                                            <p className='expense-date'>{month.toUpperCase().slice(0,3)} {new Date(expense.expense_date).getDate()+1}</p>
                                            <img src={category_images[expense.category]} alt={expense.category}></img>
                                            <h4><Link to={`/trips/${trip.id}/expenses/${expense.id}`}>{expense.name}</Link></h4>


                                            <div className='payer-details'>
                                            {user.id===expense.payer.id ? <p className='grey-color'> You paid </p> : <p className='grey-color'>{expense.payer.first_name} {expense.payer.last_name} paid</p>}
                                            <p className='expense-price'>$ {expense.total.toFixed(2)}</p>
                                            </div>


                                         <div className='you-details'>
                                           {user.id===expense.payer.id ? <p className='grey-color'> You lent </p> : <>{ user_expense_detail[expense.id].id ? <p className='grey-color'>{expense.payer.first_name} lent you</p>: <p className='grey-color'>not involved</p> }</>}

                                           {user.id===expense.payer.id ? <p className='green-color'>{user_expense_detail[expense.id].id ? `$ ${(expense.total-user_expense_detail[expense.id].price).toFixed(2)}`: `$ ${expense.total.toFixed(2)}`}</p>
                                           : <p className='orange-color'>{user_expense_detail[expense.id].id ? `$ ${user_expense_detail[expense.id].price.toFixed(2)}`:''}</p>}
                                           </div>
                                        </div>
                                    ))
                                }
                                </div>
                             ))
                        }
                    </div>
                ))
            }

        </div>
    )
}

export default Expense
