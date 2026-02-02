import { observer } from 'mobx-react'
import { FC } from 'react'
import errorStore from '../store/errorStore'

const FormError: FC<{ path: string }> = ({ path }) => {
  const errors = errorStore.get(path)
  if (errors.length > 0) {
    return <div className='ml-4 mt-2 space-y-1 flex flex-col'>
      {errors.map((error, index) => <div key={index} className='text-red-700 text-lg font-bold'>{error.message}</div>)}
    </div>
  }

  return null
}

export default observer(FormError)
