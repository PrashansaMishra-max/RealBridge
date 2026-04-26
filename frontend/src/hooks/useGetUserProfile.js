import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { USER_API_END_POINT } from '../utils/constant'

const useGetUserProfile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);
};

export default useGetUserProfile;