import clsx from 'clsx'

import './Checkbox.sass'

const Checkbox = ({
   className,
   label,
   checked = false,
   onChange = () => {},
   disabled = false,
}) => {
   const changeHandler = () => {
      onChange(!checked)
   }

   return (
      <div className={clsx('Checkbox', className)}>
         <label className="Checkbox__label">
            <div
               className={clsx('Checkbox__wrap', {
                  'Checkbox__wrap--checked': checked,
                  'Checkbox__wrap--disabled': disabled,
               })}
               onClick={changeHandler}
            >
               <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path d="M0 3.96289L1.41352 2.54937L4.94905 6.08491L3.53553 7.49842L0 3.96289Z" />
                  <path d="M8.49976 0L9.91341 1.41365L3.67622 7.65083L2.26257 6.23718L8.49976 0Z" />
               </svg>
            </div>
            {label}
         </label>
      </div>
   )
}

export default Checkbox
