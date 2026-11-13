'use client';

import { Toaster, toast } from 'react-hot-toast';

export function ToastContainer() {
  return <Toaster position="top-right" reverseOrder={false} />;
}

export const showSuccess = (msg: string) => toast.success(msg);
export const showError = (msg: string) => toast.error(msg);
export const showInfo = (msg: string) => toast(msg);
