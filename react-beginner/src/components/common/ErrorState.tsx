import type { ApiError } from "../../types/api.types";

export default function ErrorState({ error }: { error: ApiError }) {
  return <p>{error.message}</p>;
}
