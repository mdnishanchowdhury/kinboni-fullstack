import { Input } from "@/components/ui/input";

export const FileUploader = ({ onChange, value, ...props }: any) => {
    return (
        <Input
            type="file"
            accept="image/*"
            className="rounded-xl h-11 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChange(file);
            }}
            {...props}
        />
    );
};