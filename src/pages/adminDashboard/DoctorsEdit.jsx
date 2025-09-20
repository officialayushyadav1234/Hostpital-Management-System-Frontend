import { useParams } from "react-router-dom";

const DoctorsEdit = () => {
  let { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Doctor Edit by Admin {id} </h1>
    </div>
  );
};

export default DoctorsEdit;
