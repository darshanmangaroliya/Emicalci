import React from "react";

const PastData = ({ pastArryData ,editdata,handledelete }) => {

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amount</th>
            <th scope="col">interest</th>
            <th scope="col">years</th>
            <th scope="col">monthlyPayment</th>
            <th scope="col">totalPayment</th>
            <th scope="col">total Interest</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {pastArryData.map((e, i) => (
            <tr key={e.id} >
              <th scope="row" >{i}</th>
              <td>{e.amount}</td>
              <td>{e.interest}</td>
              <td>{e.years}</td>
              <td>{e.monthlyPayment}</td>
              <td>{e.totalPayment}</td>
              <td>{e.totalInterest}</td>
              <td>
              <button type="button" className="btn btn-primary" onClick={()=>editdata(e)}>edit</button>
              <button type="button" className="btn btn-danger" onClick={()=>handledelete(e.id)}>delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastData;
