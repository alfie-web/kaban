import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '../../../components/Button'

import { login } from '../../../store/reducers/auth'

const schema = yup.object().shape({
   email: yup.string().required().email(),
   password: yup.string().required().min(3).max(20),
})

const LoginForm = () => {
	const dispatch = useDispatch()
	const { isFetching } = useSelector(state => state.auth)

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   })

   const onSubmit = (data) => {
      dispatch(login(data))
   }

   return (
      <div className="Auth__form">
         <h1>Вход</h1>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="Input">
               <input
                  name="email"
                  placeholder="Электропочта"
                  defaultValue=""
                  {...register("email")}
               />
               <div className="Input__error">
                  {errors.email && 'Поле обязательно'}
               </div>
            </div>

            <div className="Input">
               <input
                  name="password"
                  placeholder="Пароль"
                  defaultValue=""
                  type="password"
						{...register("password")}
               />
               <div className="Input__error">
                  {errors.password && 'Поле обязательно'}
               </div>
            </div>

            <Button
               type="submit"
               text="Войти"
               variant="blue"
               disabled={isFetching}
            />
         </form>
      </div>
   )
}

export default LoginForm
