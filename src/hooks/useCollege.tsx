// src/hooks/useOtp.ts
import { useCallback, useState } from 'react';
import { getColleges } from '../api/registration/colleges';


export function useCollege() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCollegesData = useCallback(
        async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await getColleges();
                return data;
            } catch (err: any) {
                setError(err?.response?.data?.message || err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        }, []
    )

    return { getCollegesData, error, loading }
}