import React, { useRef, useState, useEffect } from 'react'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'

function validate({ name, email, mobile, date, priority }) {
  const errors = {}

  const isEmpty = (val) => !val || !val.trim()

  if (isEmpty(name)) errors.name = 'Name is required'

  if (isEmpty(email)) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }

  if (isEmpty(mobile)) {
    errors.mobile = 'Mobile is required'
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Must be exactly 10 digits'
  }

  if (!date) errors.date = 'Date is required'
  if (!priority) errors.priority = 'Priority is required'

  return errors
}

export default function Form({ state, dispatch }) {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const mobileRef = useRef(null)
  const dateRef = useRef(null)
  const priorityRef = useRef(null)

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const editRecord = state.editId
    ? state.records.find(r => r.id === state.editId)
    : null

  useEffect(() => {
    if (editRecord) {
      nameRef.current?.setValue(editRecord.name)
      emailRef.current?.setValue(editRecord.email)
      mobileRef.current?.setValue(editRecord.mobile)
      dateRef.current?.setValue(editRecord.date)
      priorityRef.current?.setValue(editRecord.priority)
    } else {
      clearForm()
    }
    setErrors({})
  }, [state.editId])

  function clearForm() {
    nameRef.current?.clear()
    emailRef.current?.clear()
    mobileRef.current?.clear()
    dateRef.current?.clear()
    priorityRef.current?.clear()
  }

  function handleSubmit(e) {
    e.preventDefault()

    const data = {
      name: nameRef.current.getValue(),
      email: emailRef.current.getValue(),
      mobile: mobileRef.current.getValue(),
      date: dateRef.current.getValue(),
      priority: priorityRef.current.getValue(),
    }

    const errs = validate(data)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setErrors({})

    if (editRecord) {
      dispatch({ type: 'UPDATE', payload: { ...data, id: editRecord.id } })
    } else {
      dispatch({ type: 'ADD', payload: data })
      clearForm()
    }

    navigate('/table')   
  }

  function handleCancel() {
    dispatch({ type: 'CANCEL_EDIT' })
    clearForm()
    setErrors({}),
    navigate('/table')
  }

  return (
    <div className="form-card">
      <h2>
        {editRecord ? 'Edit Record' : 'New Entry'}
        {editRecord && <span className="form-edit-badge">editing</span>}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <InputField
            ref={nameRef}
            label="Full Name"
            name="name"
            placeholder="Jane Smith"
            error={errors.name}
          />
          <InputField
            ref={emailRef}
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@example.com"
            error={errors.email}
          />
          <InputField
            ref={mobileRef}
            label="Mobile Number"
            name="mobile"
            type="tel"
            placeholder="10-digit number"
            error={errors.mobile}
          />
          <InputField
            ref={dateRef}
            label="Date"
            name="date"
            type="date"
            error={errors.date}
          />
          <InputField
            ref={priorityRef}
            label="Priority"
            name="priority"
            type="select"
            options={['High', 'Medium', 'Low']}
            error={errors.priority}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" >
            {editRecord ? 'Update Record' : 'Submit'}
          </button>

          {editRecord ? (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { clearForm(); setErrors({}) }}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}