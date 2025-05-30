


import { useState } from 'react'
import { pickRandomPhoto } from './pickRandomPhoto'

const useRandomPhoto = () => {

    // const randomPhoto = pickRandomPhoto()

    const [a, _] = useState(pickRandomPhoto())

    return a
}

export default useRandomPhoto;