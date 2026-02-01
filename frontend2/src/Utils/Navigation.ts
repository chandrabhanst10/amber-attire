import { useNavigate } from "react-router-dom";

export default function useCustomNavigate() {
  const navigate = useNavigate();
  return (path: string) => navigate(path);
}
