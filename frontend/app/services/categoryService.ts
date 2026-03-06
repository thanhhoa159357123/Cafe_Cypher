import axiosClient from '@/lib/axios'

export const getCategories = async () => {
  const response = await axiosClient.get('/categories')
  return response.data
}
