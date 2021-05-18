import clsx from 'clsx'

import './Preloader.sass'

const Preloader = ({ min, className, isVisible = true }) => {
   return isVisible ? (
      <div
         className={clsx('Preloader', className, {
            'Preloader--min': min,
         })}
      >
         <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M18.4703 2.07226C15.0166 1.7321 11.5519 2.59997 8.66645 4.52798C5.78098 6.45599 3.65328 9.32486 2.6459 12.6458C1.63852 15.9667 1.81377 19.5341 3.14181 22.7403C4.46985 25.9464 6.8685 28.5929 9.92905 30.2288C12.9896 31.8647 16.5227 32.3888 19.9264 31.7118C23.33 31.0348 26.3936 29.1985 28.5952 26.5159C30.7967 23.8333 32 20.4704 32 17C32 16.4477 32.4477 16 33 16C33.5523 16 34 16.4477 34 17C34 20.9331 32.6363 24.7444 30.1412 27.7847C27.6461 30.825 24.174 32.9061 20.3165 33.6734C16.4591 34.4407 12.4549 33.8467 8.98626 31.9927C5.51763 30.1387 2.79916 27.1393 1.29405 23.5056C-0.211057 19.872 -0.409683 15.8289 0.732018 12.0652C1.87372 8.3015 4.28511 5.05012 7.55531 2.86504C10.8255 0.679964 14.7522 -0.303619 18.6663 0.081886C19.2159 0.136019 19.6176 0.625462 19.5635 1.17509C19.5093 1.72471 19.0199 2.12639 18.4703 2.07226Z"
            />
         </svg>
      </div>
   ) : null
}

export default Preloader
