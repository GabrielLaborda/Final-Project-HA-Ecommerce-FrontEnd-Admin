import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./HomeMainSection.css"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPeopleFill, BsEnvelopePlusFill, BsFillBagPlusFill } from "react-icons/bs";

function HomeMainCards() {
  return (
        <div className="row g-0">
      {/* card one */}
      <div className='d-flex mb-1'>
        <div className="col-xl-3 col-sm-6">
          <div className='my-1 p-3 h-100'>
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon bg-gradient-dark shadow-dark text-center position-absolute d-flex justify-content-center">
                  <i className="cardIcons"><RiMoneyDollarCircleLine/></i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Today's sales</p>
                  <h4 className="mb-0">$8.3k</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0"/>
              <div className="home-card-footer p-3">
                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+55% </span>than lask week</p>
              </div>
            </div>
          </div>
        </div>
        {/* card two */}
        <div className="col-xl-3 col-sm-6">
          <div className='my-1 p-3 h-100'>
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon bg-gradient-primary shadow-primary text-center position-absolute d-flex justify-content-center">
                  <i className="cardIcons"><BsPeopleFill/></i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">Today's visitors</p>
                  <h4 className="mb-0">2,327</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0"/>
              <div className="home-card-footer p-3">
                <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than yesterday</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className='my-1 p-3 h-100'>
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon bg-gradient-success shadow-success text-center position-absolute d-flex justify-content-center">
                  <i className="cardIcons"><BsFillBagPlusFill/></i>
                </div>
                <div className="text-end pt-1">
                  <p className="text-sm mb-0 text-capitalize">New clients</p>
                  <h4 className="mb-0">462</h4>
                </div>
              </div>
              <hr className="dark horizontal my-0"/>
              <div className="home-card-footer p-3">
                <p className="mb-0"><span className="text-danger text-sm font-weight-bolder opacity-100">-2%</span> than last week</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className='my-1 p-3 h-100'>
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon bg-gradient-info shadow-info text-center position-absolute d-flex justify-content-center">
                            <i className="cardIcons"><BsEnvelopePlusFill/></i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 text-capitalize">Total sales</p>
                            <h4 className="mb-0">$103,430</h4>
                        </div>
                    </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="home-card-footer p-3">
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than last month</p>
                    </div>
                </div>
          </div>
          </div>
        </div>
        </div>
  )
}

export default HomeMainCards