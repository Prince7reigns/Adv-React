import type { Expense } from "../App"

type CardProps = {
  expense: Expense;

  onDelete: (id: number) => void;

  onEdit: (note: Expense) => void;
}

function Card({ expense,onDelete,onEdit }: CardProps) {
  return (
    <div  className="w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg hover:shadow-indigo-900 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold">
            {expense.title}
          </h2>

          <p className="text-gray-400 mt-1">
            {expense.category}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            {expense.date}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-red-400">
            ₹{expense.amount}
          </p>

          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm">
            Expense
          </span>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-3">

        <button
          className="
          px-5 py-2
          rounded-lg
          bg-indigo-600
          hover:bg-indigo-500
          text-white
          font-semibold
          transition-all
          duration-200
          shadow-md
          hover:shadow-indigo-800
          "
          onClick={()=>onEdit(expense)}
        >
          Edit
        </button>

        <button
          className="
          px-5 py-2
          rounded-lg
          bg-gray-800
          border
          border-red-500/40
          text-red-400
          font-semibold
          hover:bg-red-500/15
          hover:border-red-500
          transition-all
          duration-200
          "
          onClick={()=>onDelete(expense.id)}
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default Card