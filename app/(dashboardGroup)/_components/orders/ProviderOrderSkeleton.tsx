export function ProviderOrderSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="h-[500px] animate-pulse rounded-xl bg-muted"
                />
            ))}
        </div>
    );
}