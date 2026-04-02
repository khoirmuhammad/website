interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No data available",
}: EmptyStateProps) {
  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      <p>{message}</p>
    </div>
  );
}
