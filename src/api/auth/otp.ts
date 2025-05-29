// src/api/otp.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-dev.sellular.club/api/v1',
    timeout: 10000,
});

export interface GenerateOtpPayload {
    email?: string;
    mobile?: string;
    expiry_time: number;
}

export interface VerifyOtpPayload {
    email?: string;
    mobile?: string;
    otp: number;
    refId: number;
}

export const generateOtp = (payload: GenerateOtpPayload) => api.post('/otp/generate', payload);

export const verifyOtp = (payload: VerifyOtpPayload) => api.put('/otp/verify', payload);
