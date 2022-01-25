import React, {useState} from "react";

export default function Edit(props) {
  const initialFormState = props.coupon
  const [coupon, setCoupon] = useState(initialFormState)
  
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCoupon({ ...coupon, [name]: value })
  }

  const saveChanges = () =>{
    props.setEditToFalse(coupon)
  }

    return(
        <div>
            <div className="container">    
              <form role="form" className="text-center rounded border border-2">
                  <div className="row">
                    <div className="form-group col"></div>
                      <div className="form-group col">
                          <label htmlFor="couponName">coupon name</label>
                          <input 
                              type="text" 
                              onChange={handleInputChange} 
                              value={coupon.couponName} 
                              className="form-control" 
                              id="couponName" 
                              name="couponName"/>                          
                      </div>
                    <div className="form-group col"></div>
                  </div>                  

                  <div onChange={handleInputChange}>
                  <label htmlFor="type">type</label><br/>
                    <div className="form-check form-check-inline" id="type">
                        <input className="form-check-input" type="radio" name="type" id="Unlimited" value="Unlimited" />
                        <label className="form-check-label" htmlFor="Unlimited">Unlimited</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="Seasonal" value="Seasonal" />
                        <label className="form-check-label" htmlFor="Seasonal">Seasonal</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="type" value="Basic" />
                        <label className="form-check-label" htmlFor="Basic">Basic</label>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="form-group col"></div>
                      <div className="form-group col">
                          <label htmlFor="starDate">start date</label>
                          <input 
                          type="date" 
                          onChange={handleInputChange} 
                          value={coupon.startDate} 
                          className="form-control" 
                          id="starDate"
                          name="startDate"/>
                      </div>
                    <div className="form-group col"></div>
                  </div>

                  <div className="row">
                    <div className="form-group col"></div>
                      <div className="form-group col">
                          <label htmlFor="endDate">end date</label>
                          <input 
                          type="date" 
                          onChange={handleInputChange} 
                          value={coupon.endDate} 
                          className="form-control" 
                          id="endDate"
                          name="endDate" />
                      </div>
                    <div className="form-group col"></div>
                  </div>

                  <div className="row">
                    <div className="form-group col"></div>
                      <div className="form-group col">
                          <label htmlFor="discountAmount">discount amount</label>
                          <input 
                              type="number" 
                              onChange={handleInputChange} 
                              value={coupon.discountAmount} 
                              className="form-control" 
                              id="discountAmount"
                              name="discountAmount" />
                      </div>
                    <div className="form-group col"></div>
                  </div>

                  <div className="row">
                    <div className="form-group col"></div>
                      <div className="form-group col">
                          <label htmlFor="">user group name</label>
                          <input 
                              type="text"
                              onChange={handleInputChange} 
                              value={coupon.userGroupName} 
                              className="form-control" 
                              id="userGroupName" 
                              name="userGroupName"/>
                      </div>
                    <div className="form-group col"></div>
                  </div>                  
                  <div className="row">
                      <button type="submit" onClick={saveChanges} className="btn btn-light">save changes</button>
                  </div>
              </form>
          </div>
        </div>
    )
}