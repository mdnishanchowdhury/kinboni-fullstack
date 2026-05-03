"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { loginAction } from '../../app/(commonLayout)/(authRouteGroup)/login/_action';
import { AppField } from '../Shared/Form/Appfield';
import { ILoginPayload, loginZodSchema } from '../../zod/auth.validation';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

export default function LoginForm({ redirectPath }: { redirectPath?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    });

    const form = useForm({
        defaultValues: { email: "", password: "" },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (result?.success === false) {
                    setServerError(result.message || "Login Failed");
                }
            } catch (error: any) {
                if (error?.message?.includes("NEXT_REDIRECT")) return;
                setServerError(`Login failed: ${error.message}`);
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <Card className='w-full max-w-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-gray-200/60 rounded-[24px] overflow-hidden bg-slate-50/80 p-2'>
                <CardHeader className='text-center space-y-2 pt-10 pb-6'>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>
                        Welcome Back!
                    </CardTitle>
                    <CardDescription className='text-slate-500 text-base'>
                        Login to your <span className="text-green-600 font-medium">Kinboni</span> account
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-8 pb-8 space-y-5'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-5'
                    >
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">Email Address</label>
                            <form.Field
                                name='email'
                                validators={{ onChange: loginZodSchema.shape.email }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type='email'
                                        placeholder='kinboni@gmail.com'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663] text-gray-600"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-800">Your Password</label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-green-600 hover:underline font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <form.Field
                                name='password'
                                validators={{ onChange: loginZodSchema.shape.password }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type={showPassword ? "text" : "password"}
                                        placeholder='••••••••'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="text-slate-400 mr-2 focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                        {serverError && (
                            <Alert variant={"destructive"} className="rounded-xl py-2">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-5 bg-green-600 hover:bg-black text-white rounded-xl font-bold text-base transition-all shadow-md shadow-green-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={20} />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>


                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">Or</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <Button
                        variant='outline'
                        type="button"
                        className='w-full py-5 rounded-xl border-gray-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-3'
                        onClick={() => {
                            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                            window.location.href = `${baseUrl}/auth/login/google`;
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="text-center pt-2">
                        <p className='text-[15px] text-slate-500'>
                            Don't have an account? <Link href="/register" className='text-green-600 font-bold hover:underline'>Sign up</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}