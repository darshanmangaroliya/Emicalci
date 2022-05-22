import React from 'react'

const ResultForm = ({onchangeresult}) => {
  return (
      <div >
      {/* {onchangeresult&& */}
    <div className='container mt-5 '>
        <h2>Result Form</h2>
       <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
          monthlyPayment
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={onchangeresult?.monthlyPayment||""}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
          totalPayment
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={onchangeresult?.totalPayment||""}
            readOnly
            />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
          totalInterest
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={onchangeresult?.totalInterest||""}
            readOnly
            />
        </div>

       
      </form>
    </div>
    {/* } */}
            </div>
  )
}

export default ResultForm