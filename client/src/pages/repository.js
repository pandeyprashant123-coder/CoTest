import RepositoryList from "@/components/RepositoryList";
import { useSession } from "next-auth/react";
import React from "react";

const Repository = () => {
  const { data: session } = useSession();
  return (
    <div>
      <RepositoryList accessToken={session?.accessToken} />
    </div>
  );
};

export default Repository;
