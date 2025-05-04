import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return navigate;
};
