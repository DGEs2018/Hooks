import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
	const inputState = useState({ title: '', amount: '' }); // state can be an array, object, boolean, number, string anything - main difference with class-based components which only allows objects.
	const submitHandler = (event) => {
		event.preventDefault();
		// ...
	};

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>
						<input
							type="text"
							id="title"
							value={inputState[0].title}
							onChange={(event) => {
								const newTitle = event.target.value; // a workaround for the problem caused by the closure
								inputState[1]((previousInputState) => ({
									title: newTitle,
									amount: previousInputState.amount
								}));
							}}

							// error will now be caused because of nesting the event is a closure, meaning it's locked inside the callback function
						/>
						{/* // not 100% correct way, due to the reason react updates state, // in more complex and bigger apps where the latest state might have not been committed yet */}
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={inputState[0].amount}
							onChange={(event) => {
								const newAmount = event.target.value;
								inputState[1]((previousInputState) => ({
									amount: newAmount,
									title: previousInputState.title
								}));
							}}
						/>
					</div>
					<div className="ingredient-form__actions">
						<button type="submit">Add Ingredient</button>
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
