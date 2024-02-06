import { useAuth } from "../hooks/Auth.jsx";

export default function useStatusOptions() {
  const { user } = useAuth();

  return [
    { value: "avaible", name: "Доступно" },
    { value: "unavaible", name: "Недоступно" },
    { value: user?.user_metadata?.full_name, name: "Выбрано вами" }
  ];
}

