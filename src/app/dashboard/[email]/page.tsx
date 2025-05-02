"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function Page() {
  const params = useParams<{ email: string }>();
  const data = api.user.get.useQuery({
    email: decodeURIComponent(params.email),
  });

  return <div>Welcome</div>;
}
