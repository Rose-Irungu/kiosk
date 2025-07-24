import React from 'react'
import SecurityLayout from "../../components/SecurityComponents/SecurityLayout.jsx";
import ExpectedVisitors from "../../components/tables/ExpectedVisitors.jsx";

const VisitorsExpected = () => {
  return (
    <div>
      <SecurityLayout>

      <ExpectedVisitors/>
      </SecurityLayout>
    </div>
  )
}

export default VisitorsExpected