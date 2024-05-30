import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {promises} from "node:dns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}