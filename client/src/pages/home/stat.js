    import React from 'react'
    import HomeCard from './card'
    import stat from './stat1.svg'
    import stat1 from './stat2.svg'
    import stat2 from './stat3.svg'
    import stat3 from './stat4.svg'

    const Stat = ()=>{

        return ( 
        <div className="container-fluid home-div">
        <div className="row data mt-3">
        <HomeCard name="Income Tax" amount="1234" icons={stat} trend="bi-boxes"/>
        <HomeCard name="Staff Loan" amount="843" icons={stat2} trend="bi-bar-chart-steps"/>
        <HomeCard name="Tax Deduction" amount="982" icons={stat3} trend="bi-bezier"/>
        <HomeCard name="Salary Deduction" amount="1345" icons={stat1} trend="bi-bezier2"/>
        </div>



    </div>)
    }

    export default Stat;