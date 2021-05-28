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
               <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.706811 4.66966C0.31648 4.27933 0.31648 3.64648 0.706811 3.25615V3.25615C1.09714 2.86581 1.73 2.86581 2.12033 3.25615L4.24235 5.37816C4.63268 5.7685 4.63268 6.40135 4.24235 6.79168V6.79168C3.85201 7.18201 3.21916 7.18201 2.82883 6.79168L0.706811 4.66966Z" fill="white"/>
                  <path d="M7.79298 0.70684C8.18335 0.31647 8.81627 0.31647 9.20664 0.706839V0.706839C9.597 1.09721 9.597 1.73012 9.20663 2.12049L4.3831 6.94402C3.99273 7.33439 3.35982 7.33439 2.96945 6.94402V6.94402C2.57908 6.55365 2.57908 5.92074 2.96945 5.53037L7.79298 0.70684Z" fill="white"/>
               </svg>
            </div>
            {label}
         </label>
      </div>
   )
}

export default Checkbox
