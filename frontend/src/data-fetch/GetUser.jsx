import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice";

const GetUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(updateUser());
    }
  }, [dispatch]);
  return <></>;
};

export default GetUsers;
