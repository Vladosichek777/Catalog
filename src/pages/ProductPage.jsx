import {useParams} from "react-router-dom";

export default function ProductPage() {
  const {id} = useParams();
  return <h1> Product page: {id}</h1>;
}
