import React, { useState } from 'react';
import '../bootstrap.min.css';
import Edit from './edit';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CouponList() {

    const [coupons, setCoupons] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [couponToEdit, setCouponToEdit] = useState(null)
    const [start, setStart] = useState(0)

    const setEditToFalse = (coupon) => {
        editCoupon(coupon)
        setCoupons(coupons.map((c) => c._id === coupon._id ? coupon : c))
        setEdit(false)
    }

    const getCouponList = () => {
        debugger;
        setClicked(true)
        return fetch(`http://localhost:5050/coupon/${start}`)
            .then(c => c.json())
            .then(c => {
                setCoupons(c)
            })
            .then(_ => {
                setStart(start + 10)
                console.log(start)
            })
    }

    const editCoupon = (coupon) => {
        return fetch(`http://localhost:5050/coupon/${coupon._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coupon),
        })
            .then(response => response.json())
    }

    const deleteCoupon = (id) => {
        return fetch(`http://localhost:5050/coupon/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(getCouponList())
    }

    const scrollBottom = () => {
        console.log("ffff");
        setStart(start + 10)
        console.log(start);
        getCouponList()
    }

    return (
        <div>
            {edit && <Edit coupon={couponToEdit} setEditToFalse={setEditToFalse} />}
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
                        <InfiniteScroll
                            dataLength={start}
                            //next={scrollBottom}
                            next={getCouponList}
                            hasMore={true}
                        //inverse={true}
                        >
                            {<table className="table">
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
                                            <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                                            <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
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
                            </table>}
                        </InfiniteScroll>
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