import TableProductSkeleton from "@/components/shared/skeletons/TableProductSkeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <TableProductSkeleton />
    </div>
  );
}
