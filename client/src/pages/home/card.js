import React from 'react';

const HomeCard = ({ name, amount, icons, trend }) => {
    return (<div className="col-3 ">
        <div className="card card-stat">
            <div className="card-body flex-row">

                <div className="flex-colum">

                    <div className="text-center"><div className="mb-2"><span className="card-title ">{name}</span></div><img className='stat-image' src={icons} alt={name} /> </div>
                </div>
                <div>
                    <i class={`bi ${trend}  m-1 stat-icon`}></i><span className="text-t">{amount}</span>
                </div>
            </div>
        </div>
    </div>);
}

export default HomeCard;