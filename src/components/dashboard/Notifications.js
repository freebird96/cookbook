import React from 'react'

const Notifications = (props) =>{
    return (
        <div className = "section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <h4 className="">Notifications</h4>
                    <ul className="notifications">
                        <li>Sam has signed up </li>
                        <li>The rasmalai recipe has been published</li>
                        <li>John has signed up</li>
                        <li>Adwaith has signed up</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications