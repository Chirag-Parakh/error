// src/hooks/useOtp.ts
import axios from 'axios';
import { useCallback, useState } from 'react';
import { GenerateOtpPayload, VerifyOtpPayload, generateOtp, verifyOtp } from '../api/auth/otp';


export function useOtp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refId, setRefId] = useState<number | null>(null);
    console.log(refId)

    const sendOtp = useCallback(
        async (payload: GenerateOtpPayload) => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await generateOtp(payload);
                setRefId(data.data.refId);
                return data;
            } catch (err: any) {
                setError(err?.response?.data?.message || err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        }, []
    )

    const confirmOtp = async (otp: number, contact: { email?: string; mobile?: string }) => {
        if (refId == null) {
            throw new Error('No refId—generate OTP first');
        }
        setLoading(true);
        setError(null);
        try {
            const payload: VerifyOtpPayload = { ...contact, otp, refId: refId };
            const { data } = await verifyOtp(payload);
            return data;
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.log('Axios Error:', err.message);
                if (err.response) {
                    console.log('Error status:', err.response.status);
                    console.log('Error data:', err.response);
                } else if (err.request) {
                    console.log('No response received:', err.request);
                }
            } else {
                console.log('Unexpected Error:', err);
            }
            setError(err?.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { sendOtp, confirmOtp, loading, error };
}
