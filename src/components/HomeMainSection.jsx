import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomeMainSection.css"
import HomeMainCards from './HomeMainCards';
import HomeMainCharts from './HomeMainCharts';

function HomeMainSection() {
  return (
    <div className="row g-0">
      <div className="col-12 p-0">
        <div className="container my-4 py-4">
          <HomeMainCards />
          <HomeMainCharts />
        </div>
      </div>
    </div>
  )
}

export default HomeMainSection