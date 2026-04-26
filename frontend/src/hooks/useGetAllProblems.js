import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllProblems } from '../redux/problemSlice'
import { PROBLEM_API_END_POINT } from '../utils/constant'

const useGetAllProblems = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get(`${PROBLEM_API_END_POINT}/getall`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllProblems(res.data.problems));
                }
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            }
        };
        fetchProblems();
    }, []);
};

export default useGetAllProblems;