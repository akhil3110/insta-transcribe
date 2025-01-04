// components/loading.tsx
import useLoadingStore from "@/store/loading-store";
import React from "react";

const Loading = () => {

    const {loading} = useLoadingStore()

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                {loading.loadingType ? (
                    <p className="mt-4 text-white text-lg font-semibold">{loading.loadingType}...</p>
                ): (
                    <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Loading;
