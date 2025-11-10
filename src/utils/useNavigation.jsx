import {useNavigate} from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const goToProductCard = (id, role) => navigate(`/${role}/productCard/${id}`);
  return {goToProductCard};
}
