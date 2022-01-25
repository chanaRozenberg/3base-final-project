import React, { useState } from 'react';
import '../bootstrap.min.css';
import Edit from './edit';

export default function CouponList() {

    const [coupons, setCoupons] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [couponToEdit, setCouponToEdit] = useState(null)
    const [start, setStart] = useState(0)

    const setEditToFalse = (coupon) => {
        editCoupon(coupon._id)
        setCoupons(coupons.map((c) => c._id === coupon._id ? coupon : c))
        setEdit(false)
    }
    
    const getCouponList = () => {
        setClicked(true)
        return fetch(`http://localhost:5050/coupon/${start}`)
        .then(coupons => coupons.json())
        .then(coupons => {
            setCoupons(coupons.docs)
        })
    }

    const editCoupon = (id) => {
        return fetch(`http://localhost:5050/coupon/${id}`, {
            method: 'PUT',
        })
        .then(response => response.json())
    }

    const deleteCoupon = (id) => {
        return fetch(`http://localhost:5050/coupon/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        // .then(_ => {
        //     setCoupons(coupons.filter(({ _id }) => id !== _id))
        // })
        .then(getCouponList())
    }

    return (
        <div 
        // onClick={() =>{
        //     setStart(start + 12)
        //     getCouponList()
        // }}
        >
            {edit && <Edit coupon={couponToEdit} setEditToFalse={setEditToFalse} /> }
            {!clicked &&
                <button type="button" className="btn btn-light" onClick={() => {
                    getCouponList()
                }}>import coupons</button>
            }

            <div>
                {clicked && !coupons ?
                    <div>load....
                    </div>
                    : null}
                {coupons &&
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">check</th>
                                    <th scope="col">coupon name</th>
                                    <th scope="col">type</th>
                                    <th scope="col">start date</th>
                                    <th scope="col">end date</th>
                                    <th scope="col">discount amount</th>
                                    <th scope="col">user group name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon, index) =>
                                (
                                    <tr key={coupon._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td><input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                            onChange={() => coupon.checked = !coupon.checked} /></td>
                                        <td>{coupon.couponName}</td>
                                        <td>{coupon.type}</td>
                                        <td>{coupon.startDate}</td>
                                        <td>{coupon.endDate}</td>
                                        <td>{coupon.discountAmount}</td>
                                        <td>{coupon.userGroupName}</td>
                                        <td><button type="button" className="btn btn-light" onClick={() => {
                                            setCouponToEdit(coupon)
                                            setEdit(true)
                                        }
                                        }>edit</button></td>
                                        <td><button type="button" className="btn btn-light" onClick={() => {
                                            deleteCoupon(coupon._id)
                                        }
                                        }>delete</button></td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                        <footer className="text-center">
                            <button type="btn btn-light" onClick={() => {
                                coupons.forEach(c => c.checked && (deleteCoupon(c._id)))
                            }}>delete</button>
                        </footer>
                    </div>
                    }
            </div>
        </div>
    )
}