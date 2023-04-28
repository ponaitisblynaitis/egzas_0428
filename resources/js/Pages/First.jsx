import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";

export default function First() {


    return (
        <AppLayout>
            <div className={"col-md-12 text-center fw-bold mt-5"}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <span >Welcome! </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
