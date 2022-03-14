import React, { Suspense } from "react";
const Users = React.lazy(() => import("../../components/users"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading from Suspense...</div>}>
        <Users />
      </Suspense>
    </div>
  );
};

export default Home;
