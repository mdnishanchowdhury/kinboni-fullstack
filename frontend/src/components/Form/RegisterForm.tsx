"use client";

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { IRegisterPayload, registerZodSchema } from '../../zod/auth.validation';
import { registerAction } from '../../app/(commonLayout)/(authRouteGroup)/register/_action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { AppField } from '../Shared/Form/Appfield';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

const getZodError = (schema: z.ZodTypeAny, value: any) => {
    const res = schema.safeParse(value);
    return res.success ? undefined : res.error.issues[0].message;
};

export default function RegisterForm({ redirectPath }: { redirectPath?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IRegisterPayload) => registerAction(payload, redirectPath),
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value);

                if (result && 'success' in result && !result.success) {
                    setServerError(result.message);
                }
            } catch (error: any) {
                if (!error.message?.includes("NEXT_REDIRECT")) {
                    setServerError(error.message || "An unexpected error occurred");
                }
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center  p-4 font-sans">
            <Card className='w-full max-w-[520px] shadow-lg border-gray-200/60 rounded-[24px] bg-slate-50/80'>
                <CardHeader className='text-center space-y-1 pt-8 pb-4'>
                    <CardTitle className='text-[28px] font-bold text-slate-900 tracking-tight'>
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-[15px]">
                        Your gateway to sustainable shopping starts at <span className="text-green-600 font-semibold">Kinboni</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-8 pb-8 space-y-5'>
                    <div className="border-t border-gray-100 my-2" />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-4'
                    >
                        {/* Name Field */}
                        <form.Field
                            name='name'
                            validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.name, value) }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Full Name"
                                    placeholder='Nishan Chowdhury'
                                />
                            )}
                        </form.Field>

                        {/* Email Field */}
                        <form.Field
                            name='email'
                            validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.email, value) }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Email Address"
                                    type='email'
                                    placeholder='example@gmail.com'
                                />
                            )}
                        </form.Field>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name='password'
                                validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.password, value) }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>

                            <form.Field
                                name='confirmPassword'
                                validators={{
                                    onChange: ({ value, fieldApi }) => {
                                        if (value !== fieldApi.form.getFieldValue('password')) {
                                            return "Passwords don't match";
                                        }
                                        return undefined;
                                    }
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Confirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                        {
                            serverError && (
                                <Alert variant="destructive" className="py-2 bg-red-50 border-red-200">
                                    <AlertDescription className="text-red-800 text-sm">
                                        {serverError}
                                    </AlertDescription>
                                </Alert>
                            )
                        }

                        {/* Register Button */}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-5 bg-green-600 hover:bg-black text-white rounded-xl font-bold text-base transition-all shadow-md shadow-green-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={20} />
                                    Creating Account...
                                </span>
                            ) : (
                                "Sign Up"
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
                            Already have an account? <Link href="/login" className='text-green-600 font-bold hover:underline'>Sign in</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}