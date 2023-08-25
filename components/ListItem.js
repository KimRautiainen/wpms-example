import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => { 
    return (
        <TouchableOpacity
            onPress={() => {
                console.log('touched!', singleMedia.title);
            }}
        >
            <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: singleMedia.thumbnails.w160 }}
            />
            <Text>{singleMedia.title}</Text>
            <Text>{singleMedia.description}</Text>
        </TouchableOpacity>
    );
};
ListItem.prototypes = {
    singleMedia: PropTypes.object,
};
export default ListItem;