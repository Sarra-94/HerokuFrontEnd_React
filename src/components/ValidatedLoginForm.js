import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {withRouter} from 'react-router-dom'

const ValidatedLoginForm = (props) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting })  => {
      setTimeout(()  => {         
    // you should add the process.env to get the variable enviroment that we are runing in 
    // Ps: dont forget to eliminate from gitignore the env dev and prod 
    // to get authorazation 
      axios.post(process.env.REACT_APP_URL+"/authentification", values)
      .then(res=> res.data.jwt?  
      localStorage.setItem("token", res.data.jwt):alert("non authentified") )
        .catch(err=>  alert("login failed"))
  
        setSubmitting(false);
      }, 1000);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm
