import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <div>This is a protected route</div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Home;
