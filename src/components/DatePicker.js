import DatePicker from 'react-datepicker'
import React, { useState } from 'react';
export default function DaatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="form-container res-container container">
				<form
					className="needs-validation form-main"
					
					novalidation="true"
					>
					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Parent's Email
						</label>
						<div className="col-sm-6">
							<input
								
								name="parentemail"
								type="email"
								className="form-control"
								id="validationTooltip0"
								required
								aria-describedby="emailHelp"
								placeholder="abc@xyz.com"/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Parent's Name
						</label>
						<div className="col-sm-6">
							<input
								
								type="text"
								id="validationTooltip03"
								className="form-control mb-2"
								placeholder="Parent Name"
								required/>
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Child's name
						</label>
						<div className="col-sm-6">
							<input
								
								name="childname"
								type="text"
								className="form-control mb-2"
								id="validationTooltip02"
								placeholder="Child Name"
								required/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="text"
							className="col-sm-2 mr-5 label label-left Label">
							Child's Age
						</label>
						<div className="col-sm-6">
							<input
								
								name="childage"
								type="number"
								className="form-control mb-2"
								id="validationTooltip01"
								placeholder="Ex:10"
								min="1"
								max="100"
								required/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left Label">
							Mobile No.
						</label>
						<div className="col-sm-6">
							<input
								 
								name="mobile"
								type="text"
								data-validation="number"
								data-validation-allowing="negative,number"
								datavalidation-ignore="$"
								required
								className="form-control"
								id="phone_no"
								placeholder="Phone Number"/>
						</div>
					</div>

					<div className="form-group row">
						<label
							className="col-sm-2 mr-5 label label-left courseLabel"
							htmlFor="inlineFormCustomSelectPref"
							required="required">
							Course Name
						</label>

						<select
							// value={this.state.coursename}
							 
							name="options"
							className="custom-select my-1 mr-sm-2"
							id="inlineFormCustomSelectPref"
							required="required">
							<option value="0">Choose...</option>
							<option value="1">Scratch Junior</option>
							<option value="2">Game Development</option>
							<option value="3">App Developement</option>
							<option value="4">Web Development</option>
							<option value="5">Python</option>
						</select>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 mr-5 pr-2  label label-left mt-3">
							Pick Date and Time
						</label>
						<DatePicker
						className="col form-control ml-3 cal"
						placeholderText="Please book a slot"
						isClearable="true"
						showTimeSelect
						selected={startDate}
						onChange={(date)=>setStartDate  (date)}
						required="required"
						dateFormat="MMMM d, yyyy h:mm a "
						timeFormat="h:mm a"
						 
						/>
					</div>	
					
				<div className="butHolder">
					<button type="submit" className="btn btn-primary mt-3 ml-auto mr-auto mb-3">
								SUBMIT
					</button>
				</div>
			</form>
		</div>
    )
}