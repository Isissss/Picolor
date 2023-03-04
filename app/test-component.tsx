'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function ExampleClientComponent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ...
}