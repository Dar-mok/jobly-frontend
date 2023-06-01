import React, { useState, useEffect } from "react";

/** DESCRIPTION
 *
 * Props:
 *
 * State:
 *
 * PARENT -> LoginForm -> {CHILDREN}
 */

function LoginForm({handleLogin}) {
  const [formData, setFormData] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }


  function handleSubmit(evt) {
    console.log('hello from loginForm')
    evt.preventDefault();
    handleLogin(formData);
  }

  return (
    <div className="col-4 mx-auto position-absolute top-50 start-50 translate-middle">
      <h2 className="text-white">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="username" class="form-label">
            username
          </label>
          <input
            type="text"
            class="form-control"
            id="username"
            value={formData?.username}
            onChange={handleChange}
            aria-describedby="usernameHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            password
          </label>
          <input
            type="text"
            class="form-control"
            id="password"
            value={formData?.password}
            onChange={handleChange}
            aria-describedby="passwordHelp"
          />
        </div>

        <button class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;