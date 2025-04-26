import { useAuthStore } from "../../stores/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const Home = () => {
  const { user } = useAuthStore();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default Home;
