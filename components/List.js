import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useMedia } from "../hooks/ApiHooks";


//const apiUrl = 'https://media.mw.metropolia.fi/wbma/';





const List = () => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      data={mediaArray}
      renderItem={({ item }) => {
        return (
          <ListItem singleMedia={item} />
        );
      }}
    />
  );
};

export default List;
