import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
  });

  // Validation error state
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });
    const selectedCountryStates = getStatesByCountry(selectedCountry);
    setStates(selectedCountryStates);
  };


  const getStatesByCountry = (countryId) => {
    // Implement logic to fetch states by countryId from the database
    // For this example, we'll return sample data
    return [
      { id: 101, name: 'State A' },
      { id: 102, name: 'State B' },
    ];
  };

  const [countries, setCountries] = useState([
    { id: 1, name: 'Country 1' },
    { id: 2, name: 'Country 2' },
  ]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Get cities based on the selected state (Sample data; to be fetched from the database)
  const getCitiesByState = (stateId) => {
    // Implement logic to fetch cities by stateId from the database
    // For this example, we'll return sample data
    return [
      { id: 201, name: 'City X' },
      { id: 202, name: 'City Y' },
    ];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = validateForm(formData); // Perform validation
    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them in the state and prevent the API call
      setErrors(errors);
      return;
    } else {
      // Clear any existing validation errors
      setErrors({});
    }
  
    // Age validation check
    const today = new Date();
    const birthDate = new Date(formData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 14) {
      setErrors({ dob: "You must be older than 14 years" });
      return;
    }
  
    // If all validations pass, make the API call
    axios
      .post("http://localhost:8000/reg", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        gender: formData.gender,
        dob: formData.dob,
      })
      .then(function (response) {
        console.log(response);
        // Do something with the response, e.g., show success message, redirect to a different page, etc.
      })
      .catch(function (error) {
        console.log(error);
        // Handle the error, e.g., show an error message
      });
  };

  const validateForm = (data) => {
    let errors = {};
    const { firstName, lastName, email, country, state, city, dob } = data;

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      errors.firstName = 'First Name must contain alphabets only';
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = 'Last Name must contain alphabets only';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid Email format';
    }

    if (!country) {
      errors.country = 'Please select a Country';
    }

    if (!state) {
      errors.state = 'Please select a State';
    }

    if (!city) {
      errors.city = 'Please select a City';
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 14) {
      errors.dob = 'You must be older than 14 years';
    }

    return errors;
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    const selectedStateCities = getCitiesByState(selectedState);
    setCities(selectedStateCities);
  };


  useEffect(() => {
    // Fetch initial data (e.g., countries) from the database
    // For this example, we'll use the sample data directly
    setCountries([
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' },
    ]);
  setCities([
      { id: 1, name: 'city x' },
      { id: 2, name: 'city y' },
    ]);
  }, []);


  return (
    <div>
      <h2>Registration Form</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <div className="error-message">{errors.firstName}</div>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <div className="error-message">{errors.lastName}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <div className="error-message">{errors.country}</div>
          )}
        </div>

        <div>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <div className="error-message">{errors.state}</div>
          )}
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city && (
            <div className="error-message">{errors.city}</div>
          )}
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
            required
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
            required
          />
          <label htmlFor="female">Female</label>
          {errors.gender && (
            <div className="error-message">{errors.gender}</div>
          )}
        </div>

        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && (
            <div className="error-message">{errors.dob}</div>
          )}
        </div>

        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
