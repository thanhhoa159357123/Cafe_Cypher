import axiosClient from '@/lib/axios'

export const getProducts = async () => {
  const response = await axiosClient.get('/products')
  return response.data
}
