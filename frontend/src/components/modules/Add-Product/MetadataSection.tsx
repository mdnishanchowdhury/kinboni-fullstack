"use client";

import { Tag } from 'lucide-react';
import { AppField } from '@/components/Shared/Form/Appfield';

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="block text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-1.5">
            {children}
        </label>
    );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Icon size={18} className="text-green-500" /> {title}
            </h3>
            <div className="p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-[#fbfaf7] dark:bg-zinc-900/20 space-y-5">
                {children}
            </div>
        </div>
    );
}

interface MetadataSectionProps {
    form: any;
}

export default function MetadataSection({ form }: MetadataSectionProps) {
    return (
        <Section icon={Tag} title="Metadata">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                {/* Primary Color */}
                <div>
                    <FieldLabel>Primary Color</FieldLabel>
                    <form.Field name="metadata.primaryColor">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Tan Brown" className="rounded-xl h-12" />}
                    </form.Field>
                </div>

                {/* Accent Color */}
                <div>
                    <FieldLabel>Accent Color</FieldLabel>
                    <form.Field name="metadata.accentColor">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Black" className="rounded-xl h-12" />}
                    </form.Field>
                </div>

                {/* Pattern */}
                <div>
                    <FieldLabel>Pattern</FieldLabel>
                    <form.Field name="metadata.pattern">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Solid" className="rounded-xl h-12" />}
                    </form.Field>
                </div>

                {/* Fabric */}
                <div>
                    <FieldLabel>Fabric</FieldLabel>
                    <form.Field name="metadata.fabric">
                        {(field: any) => <AppField field={field} label="" placeholder="e.g. Genuine Leather" className="rounded-xl h-12" />}
                    </form.Field>
                </div>

            </div>
        </Section>
    );
}