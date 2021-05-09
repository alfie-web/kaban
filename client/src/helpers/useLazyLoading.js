import { useEffect } from 'react'

const useLazyLoading = (observableRef, callback) => {
   useEffect(() => {
      const options = {
         root: null,
         rootMargin: '0px',
         threshold: 1,
      }

      const observer = new IntersectionObserver((entires) => {
         if (entires[0].intersectionRatio) {
				// console.log(entires[0].intersectionRatio)
            callback()
         }
      }, options)

      observableRef.current && observer.observe(observableRef.current)
      return () => observer.disconnect()
   }, [callback, observableRef])
}

export default useLazyLoading




// import { useEffect } from 'react'

// const useLazyLoading = (observableRef, callback, isFetching) => {
//    useEffect(() => {
//       const options = {
//          root: null,
//          rootMargin: '0px',
//          threshold: 1,
//       }

//       const observer = new IntersectionObserver((entires) => {
//          if (entires[0].intersectionRatio && !isFetching) {
//             callback()
//          }
//       }, options)

//       observableRef.current && observer.observe(observableRef.current)
//       return () => observer.disconnect()
//    }, [callback, isFetching, observableRef])
// }

// export default useLazyLoading