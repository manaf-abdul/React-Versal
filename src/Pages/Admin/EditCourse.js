import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { BASEURL } from '../../constants';

const EditCourse = () => {
  const params = useParams();
  const [course, setfirst] = useState("second")
  console.log("params.id", params.id)

  const fetchCourse = async (id) => {
    const { data } = await Axios.get(`${BASEURL}api/course/${id}`)
  }

  useEffect(() => {
    if (params.id) {
      fetchCourse(params.id)
    }

  }, [])

  return (
    <></>
  )
}

export default EditCourse