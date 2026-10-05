import { forwardRef, useId } from 'react';

export default forwardRef(function FormField({ label, id, multiline = false, error, hint, className = '', ...props }, ref) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const Control = multiline ? 'textarea' : 'input';
  const describedBy = [hint && `${fieldId}-hint`, error && `${fieldId}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={fieldId}>{label}</label>
      <Control ref={ref} id={fieldId} aria-describedby={describedBy} {...props} />
      {hint && <p id={`${fieldId}-hint`} className="field-hint">{hint}</p>}
      {error && <div id={`${fieldId}-error`}>{error}</div>}
    </div>
  );
});
