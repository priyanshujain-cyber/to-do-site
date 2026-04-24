import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'

const InputField = forwardRef(function InputField(
  { label, type = 'text', name, defaultValue = '', error, options = [], placeholder },
  ref
) {
  const inputRef = useRef(null)

  // state for input + select
  const [value, setValue] = useState(defaultValue || '')
  const [open, setOpen] = useState(false)

  
  useImperativeHandle(ref, () => ({
    getValue: () => value || '',
    setValue: (v) => setValue(v || ''),
    clear: () => setValue(''),
    focus: () => inputRef.current?.focus(),
  }))

 
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.custom-select')) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="input-wrapper">
      <label>{label}</label>

      {type === 'select' ? (
        <div className="custom-select">
          {/* hidden input for consistency */}
          <input type="hidden" name={name} value={value} />

          <div
            className={`select-box ${error ? 'error' : ''}`}
            onClick={() => setOpen(!open)}
          >
            {value || 'Select priority'}
          </div>

          {open && (
            <div className="select-dropdown">
              {options.map((o) => (
                <div
                  key={o}
                  className="select-option"
                  onClick={() => {
                    setValue(o)
                    setOpen(false)
                  }}
                >
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <input
          ref={inputRef}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={error ? 'error' : ''}
        />
      )}

      {error && <span className="error-msg">{error}</span>}
    </div>
  )
})

export default InputField