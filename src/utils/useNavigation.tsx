import {useNavigate, useParams} from "react-router-dom";

export default function useNavigation() {
    const navigate = useNavigate();
    const {role} = useParams();

    const goToProductCard = (id: string) => navigate(`/${role}/productCard/${id}`);
    return {goToProductCard};
}
