import React, { useEffect, useState } from "react";
import PastData from "../Component/PastData";
import ResultForm from "../Component/ResultForm";
const getDatafromLS = () => {
  const data = localStorage.getItem("pastdata");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Homepage = () => {
  const [userValues, setUserValues] = useState({
    amount: "",
    interest: "",
    years: "",
  });

  const [results, setResults] = useState({});

  const [error, setError] = useState("");
  const [userPastData, setUserPastData] = useState(getDatafromLS());
  console.log(userPastData);
  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = "";
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = "All the values are required";
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = "All the values must be a valid number";
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = "All the values must be a positive number";
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };
  // const handleInputChange = (event) =>{

  //   setUserValues({ ...userValues, [event.target.name]: event.target.value });

  // }
  const handleAmountInputChange = (event) =>
    setUserValues({ ...userValues, amount: event.target.value });

  const handleInterestInputChange = (event) =>
    setUserValues({ ...userValues, interest: event.target.value });

  const handleYearsInputChange = (event) =>
    setUserValues({ ...userValues, years: event.target.value });

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError("");
      setUserValues({
        amount: "",
        interest: "",
        years: "",
      });
      let id = Date.now() + "" + Math.random();

      let userResult = calculateResults(userValues);
      userResult = {...userResult,id}
      setUserPastData([...userPastData, userResult]);
    }
  };

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);
    let userResult;
    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      userResult = {
        amount,
        interest,
        years,
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
      };
    }
    return userResult;
  };

  useEffect(() => {
    let result = calculateResults(userValues);
    setResults(result);
  }, [userValues.years]);
  useEffect(() => {
     localStorage.setItem("pastdata", JSON.stringify(userPastData));
  }, [userPastData]);

  const editdata = (obj)=>{
    setUserValues({ amount: obj.amount , interest: obj.interest ,years: obj.years});
    
  }
  const handledelete= (id)=>{
    let newData = userPastData.filter((e)=>{
       return e.id !==id
    })
    setUserPastData(newData)
  }
  return (
    <div className="container mb-3 overflow-auto" >
      <h2>EMI Form</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmitValues}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={userValues.amount}
            onChange={handleAmountInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            interest
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={userValues.interest}
            onChange={handleInterestInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            years
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={userValues.years}
            onChange={handleYearsInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ResultForm onchangeresult={results} />
      <PastData pastArryData={userPastData} editdata= {editdata} handledelete={handledelete}
      />
    </div>
  );
};

export default Homepage;
